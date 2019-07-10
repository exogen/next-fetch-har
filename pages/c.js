import Link from "next/link";

export default function PageC({ value }) {
  return (
    <main>
      <h1>No getInitialProps!</h1>
      <Link href="/">
        <a>Link to home page</a>
      </Link>
    </main>
  );
}
