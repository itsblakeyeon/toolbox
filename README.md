# UTM Builder

마케터를 위한 UTM 파라미터 생성 도구

## 📖 프로젝트 소개

다크 테마의 UTM URL 생성기입니다. 마케팅 캠페인 추적을 위한 UTM 파라미터를 쉽고 빠르게 만들 수 있습니다.

## 🎯 학습 프로젝트

이 프로젝트는 React, Vite, Tailwind CSS를 배우면서 진행하는 학습 프로젝트입니다.

- **학습 계획**: [LEARNING-PLAN.md](LEARNING-PLAN.md) 참고
- **개발 가이드**: [CLAUDE.md](CLAUDE.md) 참고

## ✨ 현재 구현된 기능

- ✅ 6개 UTM 파라미터 입력 (Base URL, Source, Medium, Campaign, Term, Content)
- ✅ 실시간 URL 생성 및 미리보기
- ✅ localStorage 자동 저장 (새로고침 시 데이터 유지)
- ✅ 여러 행 추가/삭제
- ✅ 각 행별 독립적인 URL 생성 및 복사
- ✅ 전체 초기화 기능
- ✅ URL 유효성 검사

## 🛠️ 기술 스택

- React 19.2
- Vite 6.4
- Tailwind CSS 3.x
- localStorage API

## 🚀 시작하기

```bash
# 저장소 클론
git clone https://github.com/itsblakeyeon/smartUtmBuilder.git
cd smartUtmBuilder

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 http://localhost:5173 접속

## 📦 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── BuilderTab.jsx      # 메인 빌더 화면
│   └── UTMRow.jsx          # UTM 입력 행 컴포넌트
├── hooks/
│   └── useLocalStorage.js  # localStorage 관리 Hook
├── utils/
│   ├── urlBuilder.js       # UTM URL 생성 로직
│   └── validation.js       # URL 유효성 검사
├── App.jsx                 # 루트 컴포넌트
└── main.jsx               # 진입점
```

## 🎨 주요 기능 설명

### 여러 행 관리
- "+ 행 추가" 버튼으로 새로운 UTM URL 생성 행 추가
- 각 행마다 독립적인 파라미터 입력 및 URL 생성
- 행별 삭제 기능 (최소 1개 행 유지)

### 자동 저장
- 모든 입력 값이 자동으로 localStorage에 저장
- 페이지 새로고침 후에도 데이터 유지
- 브라우저 종료 후 재방문 시에도 복원

### URL 유효성 검사
- Base URL 형식 검증
- 잘못된 URL 입력 시 경고 메시지 표시
- 자동 프로토콜 추가 (https://)

## 📝 향후 계획

- [ ] 저장된 URL 히스토리 기능
- [ ] 복사 성공 토스트 알림
- [ ] 키보드 단축키 지원
- [ ] URL 단축 기능 (Bitly API 연동)
- [ ] QR 코드 생성

## 📄 라이선스

ISC

---

Made with ❤️ for learning React
