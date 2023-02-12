<script lang="ts">
	import scuzzyPfp from '$lib/images/scuzzyPfp.png';
	let pageTitle = 'About ScuzzyFox';
	let pageDescription = 'ScuzzyFox is a Mexican-American furry artist and maker';
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={scuzzyPfp} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:site" content="@scuzzyfox" />
	<meta name="twitter:creator" content="@scuzzyfox" />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={scuzzyPfp} />
</svelte:head>

<main>
	<div class="pfp-containment">
		<img class="pfp" src={scuzzyPfp} alt="Digital art of scuzzy" />

		<div class="pfp-compliment">
			<h1>ScuzzyFox (he/him)</h1>
			<h3 class="pronouonciation">\skə-zē\ or \skə-tsē\</h3>
			<h4>Furry digital artist and maker.</h4>
		</div>
	</div>
	<div>
		<p>
			Hello, I'm Scuzzy, welcome to my page! This is my personal website where I post my art, share
			my goals, and take commissions and sell stuff you might like.
		</p>
		<p>
			I've been a furry since 2012 and started my journey with digital art since then. Now, I'm
			potentially starting a journey in making more than just art for the fandom. I'll be
			experimenting with making merchandise (merch), props, badges, and other things that apply
			specifically to furries. I'm excited to see where it takes me.
		</p>
	</div>
	<div>
		<h2>My Background</h2>
		<p>
			I'm a Mexican-American born to two immigrant parents in California. I have a Mechanical
			Engineering degree and built 3 formula-style racecars in college. I have a mechanical aptitude
			and can learn new skills very quickly. I am currently a warehouse technician and my job takes
			up most of my time! I love art, music, movies, games, and I have a strong deisre to understand
			how things work.
		</p>
	</div>
	<div>
		<h2>This Site</h2>
		<p>
			Scuzzyfox.com is a site that I made from the ground-up and is my first, real, full programming
			project. I've programmed robots and done data analysis before, but never worked on a project
			this big. This site is built using Svelte/kit on the front end, with mysql and Django on the
			backend.
		</p>
		<p>
			Product, merchandise, and commissions will eventally be sold here so keep an eye out in case
			you find something you like!
		</p>
		<p>
			If you're curious about the source code, you can see it <a
				href="https://github.com/ScuzzyFox/scuzzy-site">on my github.</a
			>
		</p>
	</div>
</main>

<style>
	main {
		padding: 10%;
	}

	.pfp {
		width: 30%;
	}

	.pfp-containment {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2em;
		flex: 1;
	}

	.pronouonciation {
		font-weight: 10;
		font-style: italic;
	}

	a {
		text-decoration: none;
		color: #027579;
	}
	a:hover {
		text-decoration: none;
		color: #32a5a9;
	}

	@media (max-width: 913px) {
		.pfp-containment {
			flex-direction: column;
			align-items: center;
			gap: 0;
		}
		.pfp-compliment {
			text-align: center;
		}
		.pfp {
			width: 70%;
		}
	}
</style>
