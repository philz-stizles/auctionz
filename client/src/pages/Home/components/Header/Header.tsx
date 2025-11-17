import { Container, Navbar } from '../../../../components/shared';
import { Button } from '../../../../components/ui';

const Header = () => {
  return (
    <header className="relative h-[80vh] w-full bg-cover bg-center bg-image bg-no-repeat text-slate-50 flex flex-col">
      <Navbar />
      <Container className="flex-1">
        <div className="py-12 h-full max-h-full grid grid-cols-2">
          <div className="py-8">
            <div className="max-w-lg">
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl mb-4">
                Start Bidding and Seize Your Treasure Today
              </h2>
              <p className="mb-10 text-xl tracking-tight text-white">
                Join the excitement of our online auctions. Bid now on exclusive
                items and incredible deals. Don't miss out – your next treasure
                is just a click away
              </p>
              <Button size="lg" variant="primary" onClick={() => {}}>
                Get Started Now
              </Button>
            </div>
          </div>
          <div className="">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img className="w-full" src="/images/gambler.jpg" alt="" />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
