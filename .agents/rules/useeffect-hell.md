---
trigger: always_on
---

first of all, useEffects are a source of almost all frontend troubles. always prefer derived state. unles you can justify a useEffect baed on React's best practices guide (https://react.dev/reference/react/useEffect), do not.