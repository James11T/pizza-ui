import useEmblaCarousel from "embla-carousel-react";
import React from "react";

const pages = ["HOME", "BUILDER", "BASKET"] as const;
type Page = (typeof pages)[number];

interface RouteContext {
  emblaRef: ReturnType<typeof useEmblaCarousel>[0];
  emblaApi: ReturnType<typeof useEmblaCarousel>[1];
  navigate: (page: Page) => void;
}

interface RouteProviderProps {
  children?: React.ReactNode;
}

const routeContext = React.createContext({} as RouteContext);

const RouteProvider = ({ children }: RouteProviderProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: undefined }, []);

  const navigate = React.useCallback(
    (page: Page) => {
      emblaApi?.scrollTo(pages.indexOf(page));
    },
    [emblaApi]
  );

  return (
    <routeContext.Provider value={{ emblaRef, emblaApi, navigate }}>
      {children}
    </routeContext.Provider>
  );
};

const useRoute = () => React.useContext(routeContext);

export default useRoute;
export { RouteProvider, useRoute };
export type { Page };
