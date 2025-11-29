# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

UTM Builder는 마케터들이 여러 개의 UTM URL을 효율적으로 생성하고 관리할 수 있도록 설계된 다크 테마의 테이블 기반 UTM 파라미터 생성 도구입니다.

## 현재 상태

- **단계**: 핵심 기능 구현 완료
- **기술 스택**: React + Vite, Tailwind CSS
- **아키텍처**: localStorage 지속성을 가진 단일 페이지 애플리케이션

### 구현 완료된 기능
- ✅ BuilderTab: 테이블 기반 UTM URL 생성 인터페이스
- ✅ SavedTab: 저장된 URL 관리 및 코멘트 편집
- ✅ UTMGuide: UTM 파라미터 교육 콘텐츠
- ✅ localStorage 자동 동기화 (useLocalStorage 훅)
- ✅ Google Sheets 스타일 UI (투명 input, grid 레이아웃)
- ✅ 체크박스 선택 및 일괄 저장
- ✅ URL 복사, 행 추가/삭제, 전체 초기화
- ✅ 키보드 네비게이션 (방향키로 셀 이동, Enter로 아래 이동)

### 다음 구현 예정
- 🔜 URL 유효성 검사 강화
- 🔜 키보드 단축키 (Cmd+Enter, Cmd+S, Cmd+A)
- 🔜 프리셋 시스템

## 프로젝트 초기 설정

```bash
# Vite + React 프로젝트 생성
npm create vite@latest . -- --template react

# 기본 의존성 설치
npm install

# Tailwind CSS 설치 (이미 완료됨)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**참고**: CSV 기능은 프로젝트 범위에서 제외되었습니다. papaparse 설치 불필요.

## 아키텍처 계획

### 컴포넌트 구조
```
src/
├── components/
│   ├── BuilderTab.jsx      # 메인 URL 빌더 인터페이스 (테이블)
│   ├── SavedTab.jsx        # 저장된 URL 관리
│   ├── UTMTable.jsx        # 테이블 로직 및 렌더링
│   ├── UTMRow.jsx          # 개별 행 렌더링
│   └── UTMGuide.jsx        # 교육 콘텐츠 섹션
├── hooks/
│   ├── useLocalStorage.js  # localStorage 동기화 훅
│   └── useUTMBuilder.js    # 메인 비즈니스 로직 훅
├── utils/
│   ├── urlBuilder.js       # UTM URL 생성 로직
│   ├── csvHandler.js       # CSV 가져오기/내보내기
│   └── validation.js       # URL 유효성 검사
├── App.jsx
└── main.jsx
```

### 핵심 기능

**BuilderTab (✅ 구현 완료)**
- 테이블 컬럼: 체크박스, #, Base URL, Source, Medium, Campaign, Term, Content, 생성된 URL, 액션
- 필수 필드 입력 시 실시간 URL 생성
- Google Sheets 스타일 UI: 투명 input, grid 라인만 표시, focus 시 배경색 변경
- 대량 작업: 전체 선택/해제, 선택 항목 저장
- 행 작업: 추가, 삭제, 개별 URL 복사, 전체 초기화

**SavedTab (✅ 구현 완료)**
- 저장된 URL 표시: 캠페인명(source-medium-campaign), 타임스탬프, 편집 가능한 코멘트, UTM 요약
- 작업: 개별 복사/삭제, 전체 삭제
- 인라인 코멘트 편집 (클릭 → input → 저장/취소)
- localStorage 자동 저장

**UTMGuide (✅ 구현 완료)**
- UTM 파라미터 5가지 상세 설명 (source, medium, campaign, term, content)
- 실제 사용 예시 및 베스트 프랙티스
- Google Analytics 확인 방법 안내
- SEO 및 Google AdSense 승인을 위한 교육 콘텐츠

**localStorage 지속성**
- 모든 변경 시 `rows`와 `savedItems` 상태 자동 저장
- 컴포넌트 마운트 시 복원
- 모든 데이터 초기화 기능 제공

### 주요 구현 패턴

**URL 생성 로직**
```javascript
// 필수 필드: baseUrl, source, medium, campaign
// 선택 필드: term, content
// 형식: https://example.com?utm_source=X&utm_medium=Y&utm_campaign=Z
```

**상태 관리**
- useLocalStorage 커스텀 훅으로 자동 localStorage 동기화
- 컴포넌트는 UI 렌더링에만 집중
- 각 행의 구조: id, baseUrl, source, medium, campaign, term, content, selected

**CSV 작업 (제외됨)**
- CSV 기능은 프로젝트 범위에서 제외되었습니다

## 기능 우선순위

### 구현 완료 ✅
1. ✅ **localStorage** - 새로고침 시 데이터 지속성 (useLocalStorage 훅)
2. ✅ **저장 기능** - 선택된 URL을 Saved 탭에 저장 및 관리
3. ✅ **Google Sheets 스타일 UI** - 투명 input, grid 라인, focus 효과

### 다음 구현 예정
4. **키보드 네비게이션** - 방향키로 셀 간 이동 (Excel/Google Sheets 스타일)
5. **키보드 단축키** - Cmd/Ctrl+Enter (행 추가), Cmd/Ctrl+S (저장), Cmd/Ctrl+A (전체 선택)
6. **URL 유효성 검사 강화** - 잘못된 URL 입력 방지 및 시각적 피드백 개선

### 향후 고려 사항
7. **프리셋 시스템** - 자주 사용하는 Source+Medium+Campaign 템플릿 저장
8. **URL 단축** - Bitly API 연동 (API 키 설정 필요)
9. **고급 기능** - QR 코드, 통계 대시보드, 협업 기능

## 개발 참고사항

### 컴포넌트 작성 시
- 관심사 분리: UI 렌더링 vs 비즈니스 로직
- 재사용 가능한 로직은 `useUTMBuilder` 훅으로 추출
- 유틸 함수는 순수 함수로 작성하여 테스트 가능하게 유지
- 100개 이상의 행 처리 시 React.memo 사용 고려

### 스타일링
- 다크 테마가 기본 (배경: #1a1a2e, 카드: #16213e, 테이블: #1a2642)
- Tailwind 유틸리티 클래스만 사용
- Google Sheets 스타일 구현:
  - 투명한 input 필드 (bg-transparent)
  - grid 라인만 표시 (border-r border-b border-gray-700)
  - focus 시 배경색 변경 (focus:bg-[#1a2642])
- 생성된 URL: `overflow-x-auto`, `whitespace-nowrap`, `max-w-sm`로 처리
- 반응형 디자인 보장: 모바일(<768px)에서 테이블 → 카드 뷰 전환 (향후 구현)

### 데이터 모델
```javascript
// 행 구조
{
  id: timestamp,
  baseUrl: string,
  source: string,      // 필수
  medium: string,      // 필수
  campaign: string,    // 필수
  term: string,        // 선택
  content: string,     // 선택
  generatedUrl: string,
  selected: boolean
}

// 저장된 항목 구조
{
  id: timestamp,
  campaignName: string,
  savedAt: timestamp,
  comment: string,
  params: { source, medium, campaign, term, content },
  fullUrl: string
}
```

### URL 유효성 검사 규칙
- 프로토콜이 없으면 자동으로 `https://` 추가
- `new URL()` 생성자로 유효성 검사
- 잘못된 형식에 대해 인라인 오류 메시지 표시
- 유효하지 않은 URL이 있는 행은 저장 불가

## localStorage 구현 예시

```javascript
// localStorage에 저장
localStorage.setItem('utmBuilderRows', JSON.stringify(rows));
localStorage.setItem('utmBuilderSaved', JSON.stringify(savedItems));

// 컴포넌트 마운트 시 복원
useEffect(() => {
  const savedRows = localStorage.getItem('utmBuilderRows');
  const savedData = localStorage.getItem('utmBuilderSaved');

  if (savedRows) setRows(JSON.parse(savedRows));
  if (savedData) setSavedItems(JSON.parse(savedData));
}, []);

// 데이터 변경 시마다 저장
useEffect(() => {
  localStorage.setItem('utmBuilderRows', JSON.stringify(rows));
}, [rows]);

useEffect(() => {
  localStorage.setItem('utmBuilderSaved', JSON.stringify(savedItems));
}, [savedItems]);
```

## 키보드 네비게이션 구현 예시 (다음 구현 과제)

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

각 input 필드에 data 속성 추가:
```javascript
<input
  data-row-index={index}
  data-field="baseUrl"
  onKeyDown={(e) => handleKeyDown(e, index, 'baseUrl')}
  // ... 기타 props
/>
```

## URL 유효성 검사 구현 예시

```javascript
const validateUrl = (url) => {
  if (!url) return { valid: false, message: '' };

  try {
    // 프로토콜 자동 추가
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    new URL(fullUrl);
    return { valid: true, message: '' };
  } catch (e) {
    return { valid: false, message: 'URL 형식이 올바르지 않습니다' };
  }
};

// 테이블 셀에 경고 표시
{!validateUrl(row.baseUrl).valid && row.baseUrl && (
  <div className="text-xs text-red-400 mt-1">
    {validateUrl(row.baseUrl).message}
  </div>
)}
```

## 키보드 단축키 구현 예시

```javascript
useEffect(() => {
  const handleKeyDown = (e) => {
    // Ctrl/Cmd + Enter: 행 추가
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      addRow();
    }

    // Ctrl/Cmd + S: 선택 항목 저장
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      saveUrls();
    }

    // Ctrl/Cmd + A: 전체 선택
    if ((e.ctrlKey || e.metaKey) && e.key === 'a' && activeTab === 'builder') {
      e.preventDefault();
      toggleAllSelection();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [activeTab]);
```

## SEO 및 콘텐츠

### 메타 태그 추가
```html
<!-- index.html -->
<head>
  <title>UTM Builder - 무료 UTM 파라미터 생성기</title>
  <meta name="description" content="마케팅 캠페인을 위한 UTM 파라미터를 쉽고 빠르게 생성하세요. 구글 애널리틱스 추적 코드 생성 도구.">
  <meta name="keywords" content="UTM, UTM 빌더, 마케팅, 구글 애널리틱스, 캠페인 추적">

  <!-- Open Graph -->
  <meta property="og:title" content="UTM Builder - 무료 UTM 파라미터 생성기">
  <meta property="og:description" content="마케팅 캠페인을 위한 UTM 파라미터를 쉽고 빠르게 생성하세요.">
  <meta property="og:image" content="/og-image.png">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
</head>
```

### 구조화된 데이터 (Schema.org)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "UTM Builder",
  "description": "무료 UTM 파라미터 생성 도구",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser"
}
</script>
```

- SEO/애드센스 승인을 위한 포괄적인 UTM 교육 섹션 포함
- 5가지 UTM 파라미터 모두 예시와 함께 설명
- 구조화된 데이터 추가 (Schema.org WebApplication)
- Open Graph 및 Twitter Card용 메타 태그

## 알려진 고려사항

- 성능: 100개 이상의 행에 대해 가상화(virtualization) 고려
- Safari 클립보드 API 호환성 확인 필요
- 모바일 UX: 삭제를 위한 스와이프 제스처, 하단 고정 액션 바
- IE 지원 불필요 (2023년 지원 종료)

## 반응형 디자인

### 모바일 최적화 포인트
```css
@media (max-width: 768px) {
  .table-view {
    display: none;
  }

  .card-view {
    display: block;
  }

  .fixed-bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    background: #1a202c;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.3);
  }
}
```

1. **테이블 → 카드 뷰 전환**: 768px 이하에서 카드 레이아웃으로 변경
2. **스와이프 제스처**: 행 삭제를 위한 왼쪽 스와이프
3. **하단 고정 버튼**: "행 추가", "저장" 버튼을 하단에 고정

## 배포 방법

### Vercel (추천)
```bash
# GitHub에 푸시 후 Vercel에서 자동 배포
```

### Netlify
```bash
npm run build
# dist 폴더를 Netlify에 드래그 앤 드롭
```

### GitHub Pages
```bash
# vite.config.js에 base 설정 추가
export default {
  base: '/utm-builder/'
}

npm run build
# gh-pages 브랜치에 배포
```

## 참고 자료

### UTM 관련
- [Google Analytics UTM Builder](https://ga-dev-tools.google/campaign-url-builder/)
- [UTM Parameters Guide](https://support.google.com/analytics/answer/1033867)

### React 패턴
- [React 공식 문서](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### CSV 처리
- [PapaParse](https://www.papaparse.com/)
