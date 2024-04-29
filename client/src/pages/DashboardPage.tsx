import { Page } from "../components/Page.tsx";
import "../styles/Page.css";
import uhkLogo from "../assets/uhklogo.png";

export default function DashboardPage() {
    return (
        <Page>
            <div className="page-container-asi" style={{ position: "relative" }}>
                <div className="form-container">
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <div style={{ marginRight: "20px", paddingTop: "5vw", width: "20vw" }}>
                            <img src={uhkLogo} alt="Image 1" style={{ width: "100%", height: "100%" }} />
                        </div>
                        <div>
                            <h1>Ještě Menší Nadpis</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
                                ut
                                labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                </div>

                <div className="form-container" style={{ width: "40%", marginLeft: "auto" }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end"
                    }}>
                        <div>
                            <h2>Co vše naše aplikace dokáže?</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                incididunt
                                ut
                                labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                </div>

                <div className="form-container" style={{ width: "40%", marginRight: "auto" }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start"
                    }}>
                        <div>
                            <h3>Ještě Menší Nadpis</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
                                ut
                                labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                </div>

                <div style={{ position: "absolute", left: "calc(80% - 60vw)", top: "310px", bottom: "0", display: "flex", alignItems: "center" }}>
                    <img src={uhkLogo} alt="Image 2" style={{ width: "15vw", height: "15vw", maxHeight: "100%", maxWidth: "100%" }} />
                </div>

                <div style={{ position: "absolute", right: "calc(80% - 60vw)", top: "850px", bottom: "0", display: "flex", alignItems: "center" }}>
                    <img src={uhkLogo} alt="Image 3" style={{ width: "15vw", height: "15vw", maxHeight: "100%", maxWidth: "100%" }} />
                </div>
            </div>
        </Page>
    );
}
