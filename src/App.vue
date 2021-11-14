<template>
    <div class="body">
        <div id="app">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App',
    }
</script>

<style>
    .body {
        font-family: Arial, Helvetica, sans-serif;
    }

    label {
		position: relative;
		top: 0;
		font-size: var(--font-size-small);
		opacity: 1;
		transform: translateY(0);
		transition: all 0.2s ease-out;
		color: aliceblue;
		font-weight: bold;
		}

		html, body {
			height: 100%;
		}
		body {
			margin: 0;
			background: linear-gradient(45deg, #55cac6, #ad46f1);
			font-family: sans-serif;
			font-weight: 100;
            overflow-y: hidden;
            font-weight: bold;
		}
</style>
