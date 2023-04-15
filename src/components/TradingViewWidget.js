// import React from "react";

// const TradingViewWidget = () => {
//   return (
//     <div className="tradingview-widget-container">
//       <div className="tradingview-widget-container__widget"></div>
//       <script
//         type="text/javascript"
//         src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
//         async
//       >
//         {`{
//           "showSymbolLogo": true,
//           "colorTheme": "light",
//           "isTransparent": false,
//           "displayMode": "adaptive",
//           "locale": "en"
//         }`}
//       </script>
//     </div>
//   );
// };

// export default TradingViewWidget;

import React from "react";
import ReactDOM from "react-dom";

function TradingViewWidget() {
  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget" id="root"></div>
      <script
        type="text/javascript"
        src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
        async
      >
        {`{
          "showSymbolLogo": true,
          "colorTheme": "light",
          "isTransparent": false,
          "displayMode": "adaptive",
          "locale": "en"
        }`}
      </script>
    </div>
  );
}

export default TradingViewWidget;

ReactDOM.render(<TradingViewWidget />, document.getElementById("root"));
