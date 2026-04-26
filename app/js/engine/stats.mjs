export function lnFactorial(x) {
  if (x <= 1) return 0;
  let r = 0;
  for (let i = 2; i <= x; i++) r += Math.log(i);
  return r;
}

export function lnComb(n, k) {
  if (k < 0 || k > n) return -Infinity;
  return lnFactorial(n) - lnFactorial(k) - lnFactorial(n - k);
}

export function hypergeomPmf(N, K, n, k) {
  return Math.exp(lnComb(K, k) + lnComb(N - K, n - k) - lnComb(N, n));
}

export function hypergeomSf(N, K, n, k) {
  let p = 0;
  const maxK = Math.min(K, n);
  for (let i = k; i <= maxK; i++) p += hypergeomPmf(N, K, n, i);
  return Math.min(p, 1.0);
}

