# TETRIS: REFINED

전통적인 테트리스 규칙을 따르면서 현대적인 UX/UI를 적용한 고품질 테트리스 게임입니다.

## 🎮 실행 방법

### 간단한 방법 (권장)
1. `index.html` 파일을 더블클릭하여 브라우저에서 실행
2. 또는 브라우저에서 `index.html` 파일을 드래그 & 드롭

### 로컬 서버 사용 (Python이 설치된 경우)
```bash
# Python 3
python -m http.server 8000

# 브라우저에서 http://localhost:8000 접속
```

## 🎯 게임 규칙

### 클래식 테트리스 규칙
- **테트로미노**: I, O, T, S, Z, J, L (7가지)
- **랜덤 시스템**: 7-Bag Randomizer (공정한 분배 보장)
- **회전 시스템**: SRS (Super Rotation System)
- **레벨 시스템**: 10라인 클리어 시 레벨 상승
- **점수 시스템**: Single/Double/Triple/Tetris 구분, Back-to-Back 보너스

### 조작법
| 키 | 기능 |
|---|---|
| ← → | 좌우 이동 |
| ↓ | 소프트 드롭 (빠른 낙하) |
| SPACE | 하드 드롭 (즉시 낙하) |
| Z | 반시계 방향 회전 |
| X | 시계 방향 회전 |
| C | Hold (조각 보관) |
| P / ESC | 일시정지 |

## ⚡ 주요 특징

### 퍼포먼스
- **60fps 고정** 프레임레이트
- **≤1 프레임 입력 지연** (경쟁 수준의 반응성)
- Canvas 기반 최적화 렌더링

### 입력 시스템
- **DAS (Delayed Auto Shift)**: 10프레임
- **ARR (Auto Repeat Rate)**: 2프레임
- **Lock Delay**: 30프레임 (0.5초)
- 입력 버퍼링으로 정확한 조작 보장

### 게임 기능
- ✅ Hold 기능 (조각 보관)
- ✅ Next Queue (다음 5개 조각 미리보기)
- ✅ Ghost Piece (착지 위치 표시)
- ✅ Back-to-Back Tetris 보너스
- ✅ 레벨별 속도 증가
- ✅ 최고 점수 저장 (LocalStorage)

### 디자인 철학
- **클래식 규칙 충실도**: 전통적인 테트리스 규칙을 100% 준수
- **현대적 UX/UI**: 2020년대 기준의 깔끔하고 세련된 디자인
- **미니멀리즘**: 불필요한 이펙트 제거, 게임플레이에 집중
- **반응성**: 입력 지연 최소화, 프레임 드랍 방지

## 🎨 디자인 특징

- **컬러 팔레트**: 저채도 + 고대비로 시각적 피로 최소화
- **블록 디자인**: 플랫 디자인 + 미세한 그라데이션 음영
- **타이포그래피**: Inter 폰트 사용
- **애니메이션**: 최소한의 애니메이션으로 성능 최적화

## 📊 점수 시스템

| 라인 클리어 | 기본 점수 |
|---|---|
| Single (1줄) | 100 × 레벨 |
| Double (2줄) | 300 × 레벨 |
| Triple (3줄) | 500 × 레벨 |
| Tetris (4줄) | 800 × 레벨 |

- **Back-to-Back Tetris**: Tetris를 연속으로 달성 시 50% 보너스
- **Soft Drop**: 1칸당 1점
- **Hard Drop**: 1칸당 2점

## 🛠️ 기술 스택

- **순수 JavaScript** (ES6 Modules)
- **HTML5 Canvas** (렌더링)
- **CSS3** (스타일링)
- **Google Fonts** (Inter)
- **LocalStorage** (데이터 저장)

빌드 도구 없이 바로 실행 가능한 순수 웹 애플리케이션입니다.

## 📁 프로젝트 구조

```
c:/dev/test01/
├── index.html              # 메인 HTML
├── styles/
│   └── main.css           # 스타일시트
├── src/
│   ├── constants.js       # 게임 상수
│   ├── BagRandomizer.js   # 7-Bag 랜덤 시스템
│   ├── Board.js           # 게임 보드 로직
│   ├── Tetromino.js       # 테트로미노 클래스
│   ├── SRS.js             # Super Rotation System
│   ├── GameEngine.js      # 게임 엔진
│   ├── Renderer.js        # Canvas 렌더러
│   └── main.js            # 메인 게임 루프
└── README.md              # 이 파일
```

## 🎯 개발 원칙

> "이 프로젝트의 완성도는 새로운 규칙을 추가했는지가 아니라, 얼마나 불필요한 것을 제거했는지로 평가한다."

- 게임 룰은 절대 변경하지 않음 (Classic Rule Fidelity)
- UX/UI는 2020년대 기준으로 재해석 (Modern Usability)
- 입력 지연, 프레임 드랍, 애니메이션 과잉 철저히 배제 (Competitive-grade Responsiveness)

## 🚀 즐기세요!

"익숙하지만 촌스럽지 않은 테트리스"를 경험해보세요.
