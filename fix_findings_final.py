with open('src/pages/Findings/index.tsx', 'r') as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    if i >= 29 and i <= 36:
        continue
    new_lines.append(line)
    
    # After line 45, insert the closing bracket for the handleClickOutside useEffect
    if 'return () => document.removeEventListener' in line:
        new_lines.append("  }, []);\n")

with open('src/pages/Findings/index.tsx', 'w') as f:
    f.writelines(new_lines)
