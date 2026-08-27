import { Link } from 'react-router-dom'

export default function DonationSuccess() {
	return (
		<main className="auth-page">
			<section className="auth-card form-card">
				<p className="eyebrow">THANK YOU</p>
				<h1>Donation submitted</h1>
				<p>Your contribution has been recorded successfully.</p>
				<Link className="button" to="/organizations">Explore organizations</Link>
			</section>
		</main>
	)
}
