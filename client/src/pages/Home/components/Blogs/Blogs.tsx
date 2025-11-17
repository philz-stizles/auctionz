import { Container } from '../../../../components/shared';

type Props = {};

const Blogs = (props: Props) => {
  return (
    <section className="py-12">
      <Container>
        <h2 className="text-2xl font-semibold mb-6">Upcoming Auctions</h2>
        <div className="grid grid-cols-4 gap-5">
          <div>
            <img
              className="w-full rounded-2xl"
              src="/images/window-dress.jpg"
              alt=""
            />
          </div>
          <div className="col-span-2">
            <div>
              <img
                className="w-full rounded-2xl"
                src="/images/painting.jpg"
                alt=""
              />
              <h3>Chinese works of art</h3>
              <h2>
                A Womanly Bond: Empress Dowager Cixi's Porcelains in the Levy
                Collection
              </h2>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <img className="w-full" src="/images/gambler.jpg" alt="" />
            </div>
            <div>
              <img className="w-full" src="/images/gambler.jpg" alt="" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Blogs;
