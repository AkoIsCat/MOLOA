export function devideAndSortGems(gems) {
  const extinction = [];
  const prominence = [];
  for (let i = 0; i < gems.length; i++) {
    if (
      gems[i].GemEffect.includes('피해') ||
      gems[i].GemName.includes('겁화')
    ) {
      extinction.push(gems[i]);
    } else {
      prominence.push(gems[i]);
    }
    // 보석 레벨 순으로 정렬
    extinction.sort((a, b) => b.Level - a.Level); // 피증
    prominence.sort((a, b) => b.Level - a.Level); // 재사용
  }

  return [extinction, prominence];
}
