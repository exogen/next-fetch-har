import Link from "next/link";

export default function PageB({ value }) {
  return (
    <main>
      <h1>Made it! {value}</h1>
      <Link href="/">
        <a>Link to home page</a>
      </Link>
    </main>
  );
}

PageB.getInitialProps = async ctx => {
  return { value: 5 };
};
