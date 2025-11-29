# UTM Builder 학습 계획

> 💡 이 프로젝트를 통해 React, Vite, Tailwind를 하나씩 배우면서 실용적인 도구를 만들어봅니다.
>
> **핵심 원칙**: 코드 한 줄 한 줄 이해하면서 진행하기

---

## 🎯 전체 학습 목표

1. **React 기초**: useState, useEffect, 컴포넌트 구조 이해
2. **실시간 UI 업데이트**: 입력값 변경 시 즉각적인 화면 반영
3. **URL 조작**: JavaScript로 쿼리 파라미터 생성하는 법
4. **localStorage**: 브라우저에 데이터 저장/불러오기
5. **Tailwind CSS**: 유틸리티 클래스로 다크 테마 스타일링
6. **실용적인 도구 완성**: 실제로 사용 가능한 마케팅 도구 만들기

---

## 📚 Phase 1: 기초 다지기 (가장 단순한 버전)

### 🔹 Step 1-1: 프로젝트 세팅
**목표**: Vite + React 프로젝트를 만들고 실행해보기

**배울 내용**:
- Vite가 뭔지, 왜 사용하는지
- React 프로젝트 구조 이해
- package.json의 역할

**체크리스트**:
- [x] `npm create vite` 명령어 실행
- [x] 프로젝트 구조 살펴보기
- [x] `npm run dev` 로 개발 서버 실행
- [x] 브라우저에서 기본 화면 확인

---

### 🔹 Step 1-2: Tailwind CSS 설정
**목표**: Tailwind를 설치하고 다크 테마 배경색 적용해보기

**배울 내용**:
- Tailwind CSS가 뭔지
- 유틸리티 클래스 방식이 뭔지
- 다크 테마 색상 설정

**체크리스트**:
- [x] Tailwind CSS 설치
- [x] `tailwind.config.js` 설정 이해하기
- [x] 배경색을 `#1a1a2e`로 바꿔보기
- [x] 몇 가지 기본 클래스 (`flex`, `p-4`, `bg-gray-800`) 테스트

---

### 🔹 Step 1-3: 첫 번째 입력 필드 만들기
**목표**: input 1개 만들고 입력값을 화면에 표시하기

**배울 내용**:
- `useState`가 무엇인지
- 상태(state)가 왜 필요한지
- 이벤트 핸들러 (`onChange`)
- 제어 컴포넌트 (controlled component) 개념

**만들 코드**:
```jsx
const [baseUrl, setBaseUrl] = useState('');

<input
  value={baseUrl}
  onChange={(e) => setBaseUrl(e.target.value)}
/>
<p>입력한 값: {baseUrl}</p>
```

**체크리스트**:
- [x] useState import 하기
- [x] input 만들고 타이핑 해보기
- [x] 입력값이 실시간으로 화면에 나타나는지 확인
- [x] 왜 `value`와 `onChange`가 둘 다 필요한지 이해하기

---

### 🔹 Step 1-4: UTM URL 생성 로직 구현
**목표**: 4개 필드를 만들고 실시간으로 UTM URL 생성하기

**배울 내용**:
- 여러 개의 상태 관리
- 문자열 템플릿 (template literal)
- URL 쿼리 파라미터 생성 방식
- `encodeURIComponent`의 필요성

**만들 코드**:
```jsx
const [baseUrl, setBaseUrl] = useState('');
const [source, setSource] = useState('');
const [medium, setMedium] = useState('');
const [campaign, setCampaign] = useState('');

// URL 생성 로직
const generatedUrl = baseUrl && source && medium && campaign
  ? `${baseUrl}?utm_source=${encodeURIComponent(source)}&utm_medium=${encodeURIComponent(medium)}&utm_campaign=${encodeURIComponent(campaign)}`
  : '';
```

**체크리스트**:
- [x] 4개의 input 필드 만들기 (+ term, content까지 6개 구현)
- [x] 각각 label 달기 (접근성)
- [x] 생성된 URL을 화면에 표시
- [x] 모든 필드를 채웠을 때만 URL이 나타나는지 확인
- [x] `encodeURIComponent`가 왜 필요한지 이해 (공백, 특수문자 처리)

---

### 🔹 Step 1-5: 복사 버튼 추가
**목표**: 생성된 URL을 클립보드에 복사하는 버튼 만들기

**배울 내용**:
- Clipboard API 사용법
- async/await 패턴
- 사용자 피드백 제공 (복사 완료 메시지)

**만들 코드**:
```jsx
const copyToClipboard = async () => {
  await navigator.clipboard.writeText(generatedUrl);
  alert('복사되었습니다!');
};

<button onClick={copyToClipboard}>
  URL 복사
</button>
```

**체크리스트**:
- [x] 복사 버튼 만들기
- [x] 클릭 시 URL이 클립보드에 복사되는지 확인
- [x] alert 대신 더 나은 피드백 방법 생각해보기

---

## 🎓 Phase 1 완료 후 배운 것 정리

Phase 1을 완료하면 다음을 이해하게 됩니다:
- ✅ React의 상태 관리 (useState)
- ✅ 이벤트 처리
- ✅ 조건부 렌더링
- ✅ URL 쿼리 파라미터 생성
- ✅ 브라우저 API (Clipboard)

**✨ 이 시점에서 이미 작동하는 UTM 빌더를 갖게 됩니다!**

---

## 📚 Phase 2: 테이블로 확장하기 (여러 행 관리)

### 🔹 Step 2-1: 배열 상태로 변경
**목표**: 단일 행 → 여러 행으로 데이터 구조 변경

**배울 내용**:
- 배열 상태 관리
- 객체 배열 다루기
- map 함수로 리스트 렌더링
- key prop의 중요성

**체크리스트**:
- [x] rows 배열 상태 만들기
- [x] 초기 행 1개로 시작
- [x] map으로 각 행 렌더링
- [x] 각 행마다 고유한 id 부여 (Date.now() 사용)

---

### 🔹 Step 2-2: 행 추가/삭제 기능
**목표**: 동적으로 행을 추가하고 삭제하기

**배울 내용**:
- 배열 불변성 (immutability)
- spread 연산자 (`...`)
- filter, concat 등 배열 메서드
- 왜 직접 배열을 수정하면 안 되는지

**체크리스트**:
- [x] "행 추가" 버튼 구현
- [x] 각 행마다 "삭제" 버튼 추가
- [x] 새 행 추가 시 빈 객체로 시작
- [x] 삭제 시 해당 행만 제거되는지 확인 (최소 1개 행 유지)

---

### 🔹 Step 2-3: 테이블 UI 만들기
**목표**: 입력 필드를 테이블 형태로 정리하기

**배울 내용**:
- HTML table 구조
- Tailwind로 테이블 스타일링
- 반응형 디자인 기초

**체크리스트**:
- [x] `<table>`, `<thead>`, `<tbody>` 구조 만들기 (grid 레이아웃으로 대체)
- [x] Tailwind 클래스로 다크 테마 적용
- [x] 각 컬럼 너비 조정 (grid-cols-6)
- [x] 스크롤 가능한 영역 만들기

---

## 📚 Phase 3: 데이터 지속성 (localStorage)

### 🔹 Step 3-1: localStorage에 저장
**목표**: 입력한 데이터를 브라우저에 저장하기

**배울 내용**:
- `useEffect` 훅의 역할
- localStorage API
- JSON.stringify, JSON.parse
- 의존성 배열 (dependency array)

**체크리스트**:
- [x] useEffect로 rows 변경 감지
- [x] localStorage.setItem 사용 (custom hook으로 구현)
- [x] 개발자 도구에서 저장된 데이터 확인

---

### 🔹 Step 3-2: 페이지 로드 시 복원
**목표**: 새로고침해도 데이터 유지하기

**배울 내용**:
- 컴포넌트 마운트 시 실행되는 useEffect
- 빈 의존성 배열 (`[]`)의 의미
- 초기 상태 설정 방법

**체크리스트**:
- [x] 컴포넌트 로드 시 localStorage에서 데이터 읽기
- [x] 저장된 데이터가 있으면 복원
- [x] 새로고침 해도 데이터 유지되는지 테스트

---

## 📚 Phase 4: 저장 기능 추가 ✅

### 🔹 Step 4-1: 체크박스 선택 ✅
**목표**: 특정 행만 선택해서 저장하기

**배운 내용**:
- checkbox input 다루기
- 배열 내 특정 요소 업데이트
- map으로 조건부 수정
- 전체 선택/해제 기능 구현

**구현 완료**:
- [x] 각 행에 체크박스 추가
- [x] 개별 선택 토글 기능
- [x] 전체 선택/해제 버튼
- [x] 선택된 항목 저장 기능

---

### 🔹 Step 4-2: 저장됨 탭 만들기 ✅
**목표**: 탭 전환과 저장된 항목 표시

**배운 내용**:
- 조건부 렌더링으로 탭 구현
- 타임스탬프 다루기
- Date 객체와 포맷팅
- 인라인 편집 UI 패턴

**구현 완료**:
- [x] Builder/Saved 탭 전환 UI (App.jsx)
- [x] SavedTab 컴포넌트 생성
- [x] 캠페인명, 저장 시간, UTM 파라미터 표시
- [x] 인라인 코멘트 편집 (클릭 → 수정 → 저장/취소)
- [x] 개별 복사/삭제, 전체 삭제 기능
- [x] localStorage 자동 동기화

---

### 🔹 Step 4-3: Google Sheets 스타일 UI ✅
**목표**: 테이블을 더욱 깔끔하게 만들기

**배운 내용**:
- 투명한 input 필드와 grid 레이아웃
- focus 상태 스타일링
- 긴 텍스트 처리 (overflow, whitespace)

**구현 완료**:
- [x] 박스 안에 박스 느낌 제거
- [x] 투명한 input 필드 (bg-transparent)
- [x] grid 라인만 표시 (border-r, border-b)
- [x] focus 시 배경색 변경
- [x] 생성된 URL 칸 overflow 처리

---

## 📚 Phase 5: CSV 기능 (제외)

프로젝트 범위를 줄이기 위해 CSV 기능은 구현하지 않기로 결정했습니다.

~~### 🔹 Step 5-1: CSV 다운로드~~
~~### 🔹 Step 5-2: CSV 가져오기~~

---

## 🎯 학습 팁

1. **한 번에 한 Step씩**: 욕심내지 말고 하나 완료하고 다음으로
2. **코드 직접 쳐보기**: 복붙 말고 손으로 타이핑하면서 이해
3. **console.log 많이 찍기**: 데이터가 어떻게 변하는지 확인
4. **에러 두려워하지 않기**: 에러 메시지가 최고의 선생님
5. **작동하면 커밋**: 각 Step 완료할 때마다 git commit

---

## 📝 진행 상황 체크

- [x] Phase 1: 기초 다지기 (단순 버전) ✅
- [x] Phase 2: 테이블로 확장 ✅
- [x] Phase 3: localStorage 지속성 ✅
- [x] Phase 4: 저장 기능 ✅
- [ ] Phase 5: CSV 기능 (제외)
- [x] Phase 6: 키보드 네비게이션 ✅

---

## 📚 Phase 6: 키보드 네비게이션 ✅

### 🔹 Step 6-1: 키보드 네비게이션 구현 ✅

**목표**: 방향키로 셀 간 이동하기

**배운 내용**:
- onKeyDown 이벤트 핸들러
- DOM 쿼리 선택자 (data 속성 활용)
- 커서 위치 확인 (selectionStart, selectionEnd)
- 테이블 경계 처리

**구현 완료**:
1. 모든 input 필드에 `data-row-index`와 `data-field` 속성 추가 ✅
2. `onKeyDown` 핸들러로 방향키 감지 (ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Enter) ✅
3. `focusCell(rowIndex, field)` 함수로 다음 셀에 포커스 이동 ✅
4. 커서 위치 확인하여 텍스트 편집 중일 때는 방향키 동작하지 않도록 처리 ✅

**구현 예시**:
```javascript
const fields = ['baseUrl', 'source', 'medium', 'campaign', 'term', 'content'];

const handleKeyDown = (e, rowIndex, field) => {
  const input = e.target;
  const cursorAtStart = input.selectionStart === 0;
  const cursorAtEnd = input.selectionStart === input.value.length;

  if (e.key === 'ArrowDown' || e.key === 'Enter') {
    e.preventDefault();
    focusCell(rowIndex + 1, field);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    focusCell(rowIndex - 1, field);
  } else if (e.key === 'ArrowRight' && cursorAtEnd) {
    e.preventDefault();
    const currentFieldIndex = fields.indexOf(field);
    if (currentFieldIndex < fields.length - 1) {
      focusCell(rowIndex, fields[currentFieldIndex + 1]);
    }
  } else if (e.key === 'ArrowLeft' && cursorAtStart) {
    e.preventDefault();
    const currentFieldIndex = fields.indexOf(field);
    if (currentFieldIndex > 0) {
      focusCell(rowIndex, fields[currentFieldIndex - 1]);
    }
  }
};

const focusCell = (rowIndex, field) => {
  const selector = `input[data-row-index="${rowIndex}"][data-field="${field}"]`;
  const nextInput = document.querySelector(selector);
  if (nextInput) {
    nextInput.focus();
  }
};
```

**필요한 작업**:
- [x] BuilderTab.jsx의 모든 input에 data 속성 추가
- [x] handleKeyDown 함수 구현
- [x] focusCell 함수 구현
- [x] 커서 위치 체크 로직 추가
- [x] 테이블 경계 처리 (첫 행/마지막 행, 첫 열/마지막 열)

**키보드 네비게이션 사용법**:
- ⬆️ ArrowUp: 같은 열의 위 행으로 이동
- ⬇️ ArrowDown / Enter: 같은 열의 아래 행으로 이동
- ⬅️ ArrowLeft (커서가 맨 앞): 같은 행의 왼쪽 열로 이동
- ➡️ ArrowRight (커서가 맨 뒤): 같은 행의 오른쪽 열로 이동

---

## 🚀 시작할 준비 되면

다음 세션에서 Claude에게 이렇게 말하세요:

```
"LEARNING-PLAN.md 봤어. Phase 1 Step 1-1부터 시작하자.
각 단계마다 코드 설명해주면서 천천히 진행해줘."
```

화이팅! 🔥
