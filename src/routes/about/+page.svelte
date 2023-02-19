<script lang="ts">
	import scuzzyPfp from '$lib/images/scuzzyPfp.png';
	let pageTitle = 'About ScuzzyFox';
	let pageDescription = 'ScuzzyFox is a furry artist and maker';
	import { userSettingsStore } from '$lib/stores';
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
			I've been a furry since 2012 and slove this fandom! It's the only thing I can relate to these
			days and love the creativity, variety, and art within it.
		</p>
	</div>
	<div>
		<h2>Hobbies</h2>
		<ul class="hobbies-list">
			<li>Art</li>
			<li>3D Printing</li>
			<li>Coding</li>
			<li>Electronics</li>
			<li>Woodworking</li>
			<li>Casting</li>
			<li>Photography</li>
			<li>Making things!</li>
			<li>Cars</li>
			<li>Engineering</li>
		</ul>
	</div>
	<div>
		<h2>Likes</h2>
		<ul class="hobbies-list">
			<li>DM's/messages out of the blue!</li>
			<li>Comments, shares, and interraciton on my art</li>
			<li>Questions</li>
			<li>Memes</li>
			<li>Tutorial/how-to videos</li>
			<li>Tech</li>
			<li>Events/Outings with a plan</li>
			<li>Trans Rights!</li>
			{#if $userSettingsStore.nsfwAllowed}
				<li>
					Porn-sharing (stuff you like or stuff you think I'd like!). You can spam me with stuff
					every once in a while!
				</li>
				<li>Flirting/teasing</li>
				<li>Nudes</li>
				<li>"Creepy," weird, horny comments on my art. Seriously!</li>
				<li>High-effort, high-quality, or well-done specific and odd kink art.</li>
				<li>
					Telling me that you're masturbating or that you just finished fucking your friend or
					anything! Especially if there's picture proof >:3
				</li>
				<li>Hearing about how you masturbated to me/my art</li>
				<li>Sex tech</li>
			{/if}
			{#if $userSettingsStore.abdlAllowed}
				<li>Cute baby-themed outfits</li>
				<li>Hearing about how you wet yourself</li>
				<li>Bratty/mischeifous babyfurs!</li>
			{/if}
		</ul>
	</div>
	<div>
		<h2>Dislikes</h2>
		<ul class="hobbies-list">
			<li>
				Aimless messages (e.g. "hello, how are you? I'm good" *end of conversation*). You messaged
				me hoping to go somewhere with the convo, just get to it! Be bold! <a
					href="https://nohello.net/en/">nohello.net</a
				>
			</li>
			<li>Similarly, asking if you can ask a question. Just ask it up front. 😒</li>
			<li>constantly talking about the same topic.</li>
			<li>
				Video/Music spam. I'm not gonna interrupt what I'm doing to look at all the stuff you're
				sending me smh.
			</li>
			<li>Gore, shock content, doom-news.</li>
			<li>Constant venting. I'm not a therapist.</li>
			<li>Right-wing anything</li>
			<li>Complete idiots/stupid people</li>
			{#if $userSettingsStore.nsfwAllowed}
				<li>Going on about your kink(s) every day especially if it's not my thing.</li>
			{/if}
			{#if $userSettingsStore.abdlAllowed}
				<li>Spherical diapers (I don't get it)</li>
				<li>Gigantic diapers (I alsow don't get it)</li>
				<li>IRL baby play (I don't wanna do it, but I have no problem with others doing it!)</li>
			{/if}
		</ul>
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
	<div>
		<h2>Contact</h2>
		<p>Looking to get in contact with me? Check the <a href="/contact">contact</a> page</p>
	</div>
</main>

<style>
	main {
		padding: 10%;
	}

	.pfp {
		width: 30%;
		border-radius: 1em;
		box-shadow: var(--drp-shdw);
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

	.hobbies-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1em;
		list-style-type: disc;
		list-style-position: inside;
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
