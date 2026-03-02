import re

with open('onboarding.html', 'r', encoding='utf-8') as f:
    onb = f.read()

with open('onboarding-flow.html', 'r', encoding='utf-8') as f:
    flow = f.read()

# Ectract the tools center-area from onboarding.html
tools_center_match = re.search(r'(<div class="center-area">.*?<div class="outros-expand".*?</div>\s*</div>)', onb, re.DOTALL)
tools_center = tools_center_match.group(1)

# Fix Google Calendar image (scale to 1.3 to not be huge, and use the correct paths)
# Replace svg elements with image paths
tools_center = re.sub(
    r'<button class="chip" data-tool="google-calendar".*?</svg>\s*</span>',
    '''<button class="chip" data-value="google-calendar" type="button">
                    <span class="chip-icon">
                        <img src="/assets/logos/Google_Calendar-Logo.wine.svg" alt="Google Calendar" style="transform: scale(1.3); object-fit: contain;">
                    </span>''',
    tools_center, flags=re.DOTALL
)
tools_center = re.sub(
    r'<button class="chip" data-tool="apple-calendar".*?</svg>\s*</span>',
    '''<button class="chip" data-value="apple-calendar" type="button">
                    <span class="chip-icon">
                        <img src="/assets/logos/MacOSCalendar.png" alt="Apple Calendar" style="object-fit: contain;">
                    </span>''',
    tools_center, flags=re.DOTALL
)
tools_center = re.sub(
    r'<button class="chip" data-tool="notion".*?</svg>\s*</span>',
    '''<button class="chip" data-value="notion" type="button">
                    <span class="chip-icon">
                        <img src="/assets/logos/Notion_app_logo.png" alt="Notion" style="object-fit: contain;">
                    </span>''',
    tools_center, flags=re.DOTALL
)
tools_center = re.sub(
    r'<button class="chip" data-tool="gmail".*?</svg>\s*</span>',
    '''<button class="chip" data-value="gmail" type="button">
                    <span class="chip-icon">
                        <img src="/assets/logos/Gmail_icon_(2020).svg.webp" alt="Gmail" style="object-fit: contain;">
                    </span>''',
    tools_center, flags=re.DOTALL
)

tools_center = tools_center.replace('data-tool="papel"', 'data-value="papel"')
tools_center = tools_center.replace('data-tool="outros"', 'data-value="outros"')
tools_center = tools_center.replace('id="outrosInput"', 'id="outrosInput2"')

tools_html = f"""
  <!-- ══════════════════════════════════════════
       STEP 2 — FERRAMENTAS
       ══════════════════════════════════════════ -->
  <section class="screen" id="screen-2" data-step="2">
    <div class="progress">
      <div class="progress-fill" style="width: 25%"></div>
    </div>
    <header class="header">
      <h1>Onde estão as suas<br>tarefas hoje?</h1>
      <p>Selecione o que você já usa para o DayOS sincronizar tudo em um só lugar.</p>
    </header>

    {tools_center}

    <div class="bottom">
      <button class="cta" id="cta-2" disabled>
        <span class="cta-inner">
          Continuar
          <svg class="cta-arrow" viewBox="0 0 24 24">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </span>
      </button>
    </div>
  </section>
"""

new_flow = flow

# Fix Name input cutting off
new_flow = new_flow.replace('.name-input {', '.name-input { text-overflow: ellipsis; white-space: nowrap; overflow: hidden;')

# Add missing CSS
missing_css = """
    .chip.selected .chip-icon svg { stroke: var(--white); fill: none; }
    .chip.selected .chip-icon .fill-icon { fill: var(--white); stroke: none; }
    .chip-icon { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .chip-icon svg, .chip-icon img { width: 24px; height: 24px; transition: all 0.2s ease; object-fit: contain; }
    .outros-expand { width: 100%; align-self: stretch; max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.35s var(--ease-spring), opacity 0.25s ease, margin 0.25s ease; margin-top: 0; }
    .outros-expand.open { max-height: 64px; opacity: 1; margin-top: 14px; }
"""
new_flow = new_flow.replace('.chip-emoji {\n      font-size: 16px; line-height: 1;\n    }', '.chip-emoji {\n      font-size: 16px; line-height: 1;\n    }\n' + missing_css)

new_flow = new_flow.replace('id="screen-2" data-step="2"', 'id="screen-1" data-step="1"')
new_flow = new_flow.replace('id="cta-2"', 'id="cta-1"')
new_flow = new_flow.replace('<div class="progress-fill" style="width: 33.33%"></div>', '<div class="progress-fill" style="width: 12.5%"></div>')

insertion_point = new_flow.find('<!-- ══════════════════════════════════════════\n       STEP 3 — ÁREA DE ATUAÇÃO')
new_flow = new_flow[:insertion_point] + tools_html + '\n' + new_flow[insertion_point:]

new_flow = new_flow.replace('<div class="progress-fill" style="width: 50%"></div>', '<div class="progress-fill" style="width: 40%"></div>') # screen-3
new_flow = new_flow.replace('<div class="progress-fill" style="width: 66.66%"></div>', '<div class="progress-fill" style="width: 60%"></div>') # screen-4
new_flow = new_flow.replace('<div class="progress-fill" style="width: 83.33%"></div>', '<div class="progress-fill" style="width: 80%"></div>') # screen-5
new_flow = new_flow.replace('<div class="progress-fill" style="width: 100%"></div>', '<div class="progress-fill" style="width: 100%"></div>') # screen-6

new_flow = new_flow.replace('let currentScreen = 2;', 'let currentScreen = 1;')

new_flow = new_flow.replace('cta2.disabled', 'cta1.disabled')
new_flow = new_flow.replace('cta2.addEventListener', 'cta1.addEventListener')
new_flow = new_flow.replace("const cta2 = document.getElementById('cta-2');", "const cta1 = document.getElementById('cta-1');")
new_flow = new_flow.replace('goTo(3)', 'goTo(2)')

js_tools = """
  // ═══════════════════════════════════
  //  STEP 2 — TOOLS (multi select + outros)
  // ═══════════════════════════════════
  const cta2 = document.getElementById('cta-2');
  const outrosExpand = document.getElementById('outrosExpand');
  const outrosInput2 = document.getElementById('outrosInput2');
  state.tools = [];

  document.querySelectorAll('#chips-tools .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
      const val = chip.dataset.value;
      
      if (chip.classList.contains('selected')) {
        state.tools.push(val);
      } else {
        state.tools = state.tools.filter(p => p !== val);
      }

      if (val === 'outros') {
        if (chip.classList.contains('selected')) {
          outrosExpand.classList.add('open');
          setTimeout(() => outrosInput2.focus(), 350);
        } else {
          outrosExpand.classList.remove('open');
          outrosInput2.value = '';
        }
      }

      cta2.disabled = state.tools.length === 0;
    });
  });

  cta2.addEventListener('click', () => { if (!cta2.disabled) goTo(3); });
"""

js_insertion_point = new_flow.find('//  STEP 3 — ÁREA (single select)')
new_flow = new_flow[:js_insertion_point] + js_tools + '\n  ' + new_flow[js_insertion_point:]

with open('onboarding.html', 'w', encoding='utf-8') as f:
    f.write(new_flow)

