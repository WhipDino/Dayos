import re

with open('onboarding.html', 'r') as f:
    content = f.read()

# 1. We have duplicate screen 4 in the code, and wrong order. We need:
# Screen 2: Name
# Screen 3: Tools (Onde estao tarefas)
# Screen 4: Area
# Screen 5: Dores
# Screen 6: Horario trubalho
# Screen 7: Recap
# Ready

# We will just replace from <section class="screen active" id="screen-2" to <section class="screen" id="screen-ready"> inclusive... wait, let's just make a new file using the user's previously requested screens in the correct order. The tools array is given.

import sys
sys.exit(0)
