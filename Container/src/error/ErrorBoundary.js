import React, { Suspense } from "react";
import axios from "axios";
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }
  // componentDidMount(){
  //   axios.get("http://localhost:3004/remoteEntry.js").then((res)=>{
  //     console.log("success")
  //   }).catch((error)=>{
  //     console.log(" error")
  //   })

  //}
  render() {
    //console.log(this.state.hasError,"this.state.hasError",error)
    if (this.state.hasError) {
      return (
        <div className="wrapper" style={{ background: "white" }}>
          <div
            className="main_content"
            style={{ color: "Black", fontSize: "20px", background: "white" }}
          >
            {this.props.fallback}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
