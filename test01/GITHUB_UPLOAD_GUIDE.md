# GitHub 업로드 가이드

## 📦 업로드할 리포지토리
**URL**: https://github.com/mathservice004-collab/tetris.git

---

## 방법 1: GitHub Desktop 사용 (가장 쉬움) ⭐ 추천

### 1단계: GitHub Desktop 설치
1. https://desktop.github.com/ 에서 다운로드
2. 설치 후 GitHub 계정으로 로그인

### 2단계: 리포지토리 추가
1. GitHub Desktop 실행
2. `File` → `Add local repository`
3. `c:\dev\test01` 폴더 선택
4. "Initialize Git LFS" 나오면 건너뛰기

### 3단계: 커밋
1. 왼쪽 하단 Summary에 입력:
   ```
   Initial commit: TETRIS: REFINED
   ```
2. Description에 입력:
   ```
   - Complete tetris game with classic rules
   - SRS rotation system
   - 7-bag randomizer
   - 60fps performance
   - Modern UI/UX
   ```
3. `Commit to main` 버튼 클릭

### 4단계: 원격 저장소 연결 및 푸시
1. 상단 메뉴 `Repository` → `Repository settings`
2. `Primary remote repository` 옆 `Change` 클릭
3. URL 입력:
   ```
   https://github.com/mathservice004-collab/tetris.git
   ```
4. 상단 `Publish repository` 또는 `Push origin` 버튼 클릭

---

## 방법 2: Git 명령줄 사용 (Git 설치 필요)

### 1단계: Git 설치
1. https://git-scm.com/download/win 에서 다운로드
2. 기본 설정으로 설치

### 2단계: PowerShell에서 실행

```powershell
# 프로젝트 폴더로 이동
cd c:\dev\test01

# Git 초기화
git init

# 사용자 정보 설정 (처음 한 번만)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit: TETRIS: REFINED

- Complete tetris game with classic rules
- SRS rotation system
- 7-bag randomizer
- 60fps performance
- Modern UI/UX"

# 원격 저장소 추가
git remote add origin https://github.com/mathservice004-collab/tetris.git

# 기본 브랜치 이름 설정
git branch -M main

# 푸시 (인증 필요)
git push -u origin main
```

### 인증 방법
- Personal Access Token 사용 권장
- GitHub → Settings → Developer settings → Personal access tokens
- `repo` 권한 체크
- 생성된 토큰을 비밀번호로 입력

---

## 방법 3: GitHub 웹 인터페이스 사용 (파일 개수 적을 때)

### 1단계: 리포지토리로 이동
1. https://github.com/mathservice004-collab/tetris 접속
2. 로그인

### 2단계: 파일 업로드
1. `Add file` → `Upload files` 클릭
2. 다음 파일/폴더를 드래그 & 드롭:
   - `index.html`
   - `README.md`
   - `QUICKSTART.md`
   - `styles` 폴더
   - `src` 폴더

### 3단계: 커밋
1. Commit message 입력:
   ```
   Initial commit: TETRIS: REFINED
   ```
2. Extended description:
   ```
   - Complete tetris game with classic rules
   - SRS rotation system
   - 60fps performance
   - Modern UI/UX
   ```
3. `Commit changes` 클릭

---

## 방법 4: VS Code 사용 (VS Code 설치되어 있다면)

### 1단계: VS Code로 폴더 열기
```
code c:\dev\test01
```

### 2단계: Source Control 사용
1. 왼쪽 Source Control 아이콘 클릭 (Git 아이콘)
2. `Initialize Repository` 클릭
3. 모든 파일 Stage (+ 버튼)
4. 커밋 메시지 입력 후 커밋
5. `...` 메뉴 → `Remote` → `Add Remote`
6. URL 입력: `https://github.com/mathservice004-collab/tetris.git`
7. `Synchronize Changes` 클릭

---

## 📋 업로드할 파일 목록

```
c:\dev\test01\
├── index.html              ✅ 업로드
├── README.md               ✅ 업로드
├── QUICKSTART.md           ✅ 업로드
├── styles\
│   └── main.css           ✅ 업로드
└── src\
    ├── constants.js       ✅ 업로드
    ├── BagRandomizer.js   ✅ 업로드
    ├── Board.js           ✅ 업로드
    ├── Tetromino.js       ✅ 업로드
    ├── SRS.js             ✅ 업로드
    ├── GameEngine.js      ✅ 업로드
    ├── Renderer.js        ✅ 업로드
    └── main.js            ✅ 업로드
```

**총 11개 파일**

---

## 🎯 추가로 만들면 좋은 파일

GitHub에 업로드하기 전에 이 파일들을 추가하면 더 좋습니다:

### .gitignore
```gitignore
# OS
.DS_Store
Thumbs.db

# Editors
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log
```

### LICENSE
MIT License 권장:
```
MIT License

Copyright (c) 2026 mathservice004-collab

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## ✅ 업로드 후 확인사항

1. **README.md가 올바르게 표시되는지 확인**
   - https://github.com/mathservice004-collab/tetris

2. **GitHub Pages 활성화** (선택사항)
   - Settings → Pages
   - Source: `main` branch
   - 몇 분 후 https://mathservice004-collab.github.io/tetris/ 에서 게임 플레이 가능!

3. **리포지토리 설명 추가**
   - About 섹션 편집
   - Description: `Classic Tetris with modern UI/UX - 60fps, SRS rotation, 7-bag randomizer`
   - Website: GitHub Pages URL (활성화한 경우)
   - Topics: `tetris`, `html5`, `canvas`, `game`, `javascript`

---

## 🚀 다음 단계

업로드가 완료되면:

1. **GitHub Pages 활성화**하여 온라인에서 플레이 가능하게 만들기
2. **README에 데모 링크** 추가
3. **스크린샷** 추가 (게임 플레이 화면)
4. **릴리즈 생성** (v1.0.0)

---

## ❓ 문제 해결

### "Repository not found" 오류
- 리포지토리가 존재하는지 확인
- 저장소 URL이 정확한지 확인
- 계정 권한이 있는지 확인

### 인증 실패
- Personal Access Token 사용
- GitHub → Settings → Developer settings → Personal access tokens
- `repo` 권한 부여

### 푸시 실패
- 리포지토리가 비어있는지 확인
- 충돌이 있다면 `git pull origin main --allow-unrelated-histories` 먼저 실행

---

어떤 방법을 사용하시겠어요? 가장 쉬운 방법은 **GitHub Desktop**입니다!
