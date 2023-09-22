import { Button } from '../../components/ui';

const Home = () => {
  return (
    <>
      <header></header>
      <section
        id="get-started-today"
        className="relative overflow-hidden py-32 bg-gradient-to-r from-violet-600 to-indigo-600"
      >
        <img
          alt=""
          loading="lazy"
          width="2347"
          height="1244"
          decoding="async"
          data-nimg="1"
          className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 text-transparent"
          src="/_next/static/media/background-call-to-action.6a5a5672.jpg"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl mb-4">
              Get started today
            </h2>
            <p className="mb-10 text-lg tracking-tight text-white">
              It’s time to take control of your books. Buy our software so you
              can feel like you’re doing something productive.
            </p>
            <Button variant="secondary" onClick={() => {}}>
              Get 6 months free
            </Button>
            {/* <a
   
            href="/register"
          >
            
          </a> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
