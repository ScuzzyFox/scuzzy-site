<div id="donate-button-container">
	<div id="donate-button" />
	<script src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js" charset="UTF-8"></script>
	<script>
		PayPal.Donation.Button({
			env: 'production',
			hosted_button_id: 'A42QXPFQF5LUY',
			image: {
				src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif',
				alt: 'Donate with PayPal button',
				title: 'PayPal - The safer, easier way to pay online!'
			}
		}).render('#donate-button');
	</script>
</div>

<style>
	#donate-button-container {
		height: fit-content;
		align-items: center;
		justify-content: center;
		display: flex;
	}
</style>
