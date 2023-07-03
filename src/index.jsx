import { render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import preactLogo from './assets/preact.svg';
import viteLogo from '/vite.svg';
import './style.css';
import { createLibp2p } from "libp2p";
import { webSockets } from '@libp2p/websockets'
import { mplex } from '@libp2p/mplex';
import { noise } from '@chainsafe/libp2p-noise';
import { all as filterAll } from "@libp2p/websockets/filters";

async function initLibp2p() {
	const libp2p = await createLibp2p({
		transports: [webSockets({ filter: filterAll })],
		streamMuxers: [mplex()],
		connectionEncryption: [noise()],
	})

	console.debug({ libp2p })

	return libp2p
}

export function App() {
	const [count, setCount] = useState(0);
	

	useEffect(() => {
		initLibp2p()
	}, [])

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} class="logo" alt="Vite logo" />
				</a>
				<a href="https://preactjs.com" target="_blank">
					<img src={preactLogo} class="logo preact" alt="Preact logo" />
				</a>
			</div>
			<h1>Vite + Preact</h1>
			<div class="card">
				<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
				<p>
					Edit <code>src/app.jsx</code> and save to test HMR
				</p>
			</div>
			<p class="read-the-docs">Click on the Vite and Preact logos to learn more</p>
		</>
	);
}

render(<App />, document.getElementById('app'));
