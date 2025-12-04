function UTMGuide() {
  return (
    <div className="max-w-6xl mx-auto p-6 mt-12 relative z-10">
      {/* 구분선 */}
      <div className="border-t border-white/10 mb-12"></div>

      {/* 제목 */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
          UTM 파라미터란 무엇인가요?
        </h2>
        <p className="text-gray-200 text-lg max-w-3xl mx-auto">
          UTM 파라미터는 마케팅 캠페인의 트래픽 출처를 추적하기 위해 URL에
          추가하는 태그입니다. 구글 애널리틱스에서 어떤 채널이 가장 효과적인지
          분석할 수 있습니다.
        </p>
      </div>

      {/* 5가지 파라미터 카드 */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* utm_source */}
        <div className="glass rounded-2xl p-6 shadow-xl">
          <div className="flex items-start gap-3 mb-3">
            <span className="glass-button glass-button-gray text-white px-3 py-1 rounded-lg text-sm font-semibold">
              필수
            </span>
            <h3 className="text-xl font-bold text-white">utm_source</h3>
          </div>
          <p className="text-gray-200 mb-4">
            트래픽이 어디에서 왔는지 식별합니다. (광고 플랫폼, 검색엔진,
            뉴스레터 등)
          </p>
          <div className="glass-subtle p-4 rounded-xl">
            <p className="text-sm text-gray-300 mb-2">예시:</p>
            <code className="text-green-300 text-sm">
              utm_source=google
              <br />
              utm_source=facebook
              <br />
              utm_source=newsletter
            </code>
          </div>
        </div>

        {/* utm_medium */}
        <div className="glass rounded-2xl p-6 shadow-xl">
          <div className="flex items-start gap-3 mb-3">
            <span className="glass-button glass-button-gray text-white px-3 py-1 rounded-lg text-sm font-semibold">
              필수
            </span>
            <h3 className="text-xl font-bold text-white">utm_medium</h3>
          </div>
          <p className="text-gray-200 mb-4">
            마케팅 매체 유형을 나타냅니다. (유료광고, 이메일, 소셜미디어 등)
          </p>
          <div className="glass-subtle p-4 rounded-xl">
            <p className="text-sm text-gray-300 mb-2">예시:</p>
            <code className="text-green-300 text-sm">
              utm_medium=cpc (클릭당 과금)
              <br />
              utm_medium=email
              <br />
              utm_medium=social
            </code>
          </div>
        </div>

        {/* utm_campaign */}
        <div className="glass rounded-2xl p-6 shadow-xl">
          <div className="flex items-start gap-3 mb-3">
            <span className="glass-button glass-button-gray text-white px-3 py-1 rounded-lg text-sm font-semibold">
              필수
            </span>
            <h3 className="text-xl font-bold text-white">utm_campaign</h3>
          </div>
          <p className="text-gray-200 mb-4">
            특정 캠페인을 식별합니다. (프로모션 이름, 전략적 캠페인 등)
          </p>
          <div className="glass-subtle p-4 rounded-xl">
            <p className="text-sm text-gray-300 mb-2">예시:</p>
            <code className="text-green-300 text-sm">
              utm_campaign=spring_sale
              <br />
              utm_campaign=black_friday
              <br />
              utm_campaign=product_launch
            </code>
          </div>
        </div>

        {/* utm_term */}
        <div className="glass rounded-2xl p-6 shadow-xl">
          <div className="flex items-start gap-3 mb-3">
            <span className="glass-button glass-button-gray text-white px-3 py-1 rounded-lg text-sm font-semibold">
              선택
            </span>
            <h3 className="text-xl font-bold text-white">utm_term</h3>
          </div>
          <p className="text-gray-200 mb-4">
            유료 검색 광고의 키워드를 추적합니다. (Google Ads, Naver 광고 등)
          </p>
          <div className="glass-subtle p-4 rounded-xl">
            <p className="text-sm text-gray-300 mb-2">예시:</p>
            <code className="text-green-300 text-sm">
              utm_term=running+shoes
              <br />
              utm_term=best+laptop
              <br />
              utm_term=marketing+tools
            </code>
          </div>
        </div>

        {/* utm_content */}
        <div className="glass rounded-2xl p-6 shadow-xl md:col-span-2">
          <div className="flex items-start gap-3 mb-3">
            <span className="glass-button glass-button-gray text-white px-3 py-1 rounded-lg text-sm font-semibold">
              선택
            </span>
            <h3 className="text-xl font-bold text-white">utm_content</h3>
          </div>
          <p className="text-gray-200 mb-4">
            동일한 광고 내 여러 링크를 구분합니다. (A/B 테스트, 배너 위치 등)
          </p>
          <div className="glass-subtle p-4 rounded-xl">
            <p className="text-sm text-gray-300 mb-2">예시:</p>
            <code className="text-green-300 text-sm">
              utm_content=banner_ad (배너 광고)
              <br />
              utm_content=text_link (텍스트 링크)
              <br />
              utm_content=header_cta (헤더 CTA 버튼)
            </code>
          </div>
        </div>
      </div>

      {/* 실제 사용 예시 */}
      <div className="glass-strong rounded-2xl p-8 mb-12 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-4">
          실제 사용 예시
        </h3>
        <p className="text-gray-200 mb-4">
          페이스북 광고에서 봄 세일 캠페인을 진행한다면:
        </p>
        <div className="glass-subtle p-4 rounded-xl overflow-x-auto">
          <code className="text-gray-200 text-sm break-all">
            https://example.com?utm_source=facebook&utm_medium=cpc&utm_campaign=spring_sale&utm_content=banner_ad
          </code>
        </div>
        <p className="text-gray-300 mt-4 text-sm">
          → 구글 애널리틱스에서 "페이스북 유료 광고로 유입된 봄 세일 캠페인
          배너"를 클릭한 방문자 수를 추적할 수 있습니다.
        </p>
      </div>

      {/* 베스트 프랙티스 */}
      <div className="glass-strong rounded-2xl p-8 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-4">
          UTM 파라미터 명명 규칙 (Best Practices)
        </h3>
        <ul className="space-y-3 text-gray-200">
          <li className="flex items-start gap-3">
            <span className="text-green-300 mt-1">✓</span>
            <span>
              <strong className="text-white">소문자 사용:</strong> utm_source=Google 대신{" "}
              <code className="glass-subtle px-2 py-1 rounded-lg text-green-300">
                utm_source=google
              </code>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-300 mt-1">✓</span>
            <span>
              <strong className="text-white">일관성 유지:</strong> 항상 동일한 명명
              규칙 사용 (예: facebook vs fb)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-300 mt-1">✓</span>
            <span>
              <strong className="text-white">언더스코어 사용:</strong> 공백 대신{" "}
              <code className="glass-subtle px-2 py-1 rounded-lg text-green-300">
                spring_sale
              </code>{" "}
              (자동 인코딩됨)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-300 mt-1">✓</span>
            <span>
              <strong className="text-white">간결하게 작성:</strong> 긴 이름보다는
              의미 있는 약어 사용
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-300 mt-1">✗</span>
            <span>
              <strong className="text-white">개인정보 포함 금지:</strong> 이메일,
              전화번호 등 민감한 정보 넣지 않기
            </span>
          </li>
        </ul>
      </div>

      {/* 구글 애널리틱스 확인 방법 */}
      <div className="mt-12 text-center">
        <p className="text-gray-300">
          생성한 UTM URL은{" "}
          <strong className="text-white">
            구글 애널리틱스 &gt; 획득 &gt; 캠페인
          </strong>
          에서 확인할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

export default UTMGuide;
