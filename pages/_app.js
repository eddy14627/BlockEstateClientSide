import "../styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "../context";
// internal imports
const App = ({ Component, pageProps }) => {
  return (
    <>
      <ThirdwebProvider activeChain={ChainId.Mumbai}>
        <StateContextProvider>
          <Component {...pageProps} />
        </StateContextProvider>
      </ThirdwebProvider>

      <script src="/js/vendor/jquery.js" async></script>
      <script src="/js/vendor/jquery.nice-select.min.js" async></script>
      <script src="/js/vendor/jquery-ui.js" async></script>
      <script src="/js/vendor/modernizer.min.js" async></script>
      <script src="/js/vendor/feather.min.js" async></script>
      <script src="/js/vendor/slick.min.js" async></script>
      <script src="/js/vendor/bootstrap.min.js" async></script>
      <script src="/js/vendor/sal.min.js" async></script>
      <script src="/js/vendor/particles.js" async></script>
      <script src="/js/vendor/jquery.style.swicher.js" async></script>
      <script src="/js/vendor/js.cookie.js" async></script>
      <script src="/js/vendor/count-down.js" async></script>
      <script src="/js/vendor/isotop.js" async></script>
      <script src="/js/vendor/imageloaded.js" async></script>
      {/* <script src="/js/vendor/backtoTop.js" async></script> */}
      <script src="/js/vendor/odometer.js" async></script>
      <script src="/js/vendor/jquery-appear.js" async></script>
      <script src="/js/vendor/scrolltrigger.js" async></script>
      <script src="/js/vendor/jquery.custom-file-input.js" async></script>
      <script src="/js/vendor/savePopup.js" async></script>
      <script src="/js/vendor/vanilla.tilt.js" async></script>

      <script src="/js/main.js" async></script>

      <script src="/js/vendor/web3.min.js" async></script>
      <script src="/js/vendor/maralis.js" async></script>
      <script src="/js/vendor/nft.js" async></script>
    </>
  );
};

export default App;
