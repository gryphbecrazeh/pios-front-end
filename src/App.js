import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavBar from "./components/AppNavBar";
import MasterPage from "./pages/pageMaster";
import { Provider } from "react-redux";
import store from "./store";

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<AppNavBar />
				<MasterPage />
			</div>
		</Provider>
	);
}

export default App;
