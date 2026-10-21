// stand-in for poki's sdk so the game runs off poki: no ads, no tracking, every call succeeds
(function () {
	const ok = () => Promise.resolve();
	const api = {
		init: ok,
		setDebug() {},
		gameLoadingStart() {},
		gameLoadingFinished() {},
		gameplayStart() {},
		gameplayStop() {},
		commercialBreak: (cb) => Promise.resolve(),
		rewardedBreak: () => Promise.resolve(true),
		login: () => Promise.reject(new Error("no accounts here")),
		getUser: () => Promise.resolve(null),
		getToken: () => Promise.resolve(null),
		measure() {},
		openExternalLink: (u) => window.open(u, "_blank"),
		requestAd: ok,
		showLeaderboard: ok,
		isAdBlocked: () => false,
		getURLParam: (k) => new URLSearchParams(location.search).get(k) || "",
		shareableURL: () => Promise.resolve(location.href),
	};
	// anything else the game might call just resolves
	window.PokiSDK = new Proxy(api, { get: (t, k) => (k in t ? t[k] : ok) });
})();
