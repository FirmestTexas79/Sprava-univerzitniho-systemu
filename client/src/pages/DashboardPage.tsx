import { Page } from "../components/Page.tsx";
import "../styles/Page.css";
import uhkLogo from "../assets/uhklogo.png";



export default function DashboardPage() {

    return (
        <Page>
            {/*<div className="page-container">*/}
                <div style={{display: "flex", alignItems: "center", marginBottom: "20px", justifyContent: "center"}}>
                    <div style={{marginRight: "20px", width: "100px", height: "100px"}}>
                        <img src={uhkLogo} alt="Image 1" style={{width: "100%", height: "100%"}}/>
                    </div>
                    <div>
                        <h1>Velký Nadpis</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.</p>
                    </div>
                </div>

                <div style={{display: "flex", alignItems: "center", marginBottom: "20px", justifyContent: "center"}}>
                    <div>
                        <h2>Menší Nadpis</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.</p>
                    </div>
                    <div style={{marginLeft: "20px", width: "100px", height: "100px"}}>
                        <img src={uhkLogo} alt="Image 2" style={{width: "100%", height: "100%"}}/>
                    </div>
                </div>

                <div style={{display: "flex", alignItems: "center", marginBottom: "20px", justifyContent: "center"}}>
                    <div style={{marginRight: "20px", width: "100px", height: "100px"}}>
                        <img src={uhkLogo} alt="Image 3" style={{width: "100%", height: "100%"}}/>
                    </div>
                    <div>
                        <h3>Ještě Menší Nadpis</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.</p>
                    </div>
                </div>

                <div style={{display: "flex", alignItems: "center", marginBottom: "20px", justifyContent: "center"}}>
                    <div>
                        <h4>Úplně Malý Nadpis</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.</p>
                    </div>
                    <div style={{marginLeft: "20px", width: "100px", height: "100px"}}>
                        <img src={uhkLogo} alt="Image 4" style={{width: "100%", height: "100%"}}/>
                    </div>
                </div>
            {/*</div>*/}
        </Page>
);
}
