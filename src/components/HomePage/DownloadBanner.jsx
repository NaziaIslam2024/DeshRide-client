import download from "../../assets/download-app-banner.webp";

const DownloadBanner = () => {
    return (
        <div className="w-11/12 mx-auto mt-10">
            <img src={download} className="w-full" alt="" />
        </div>
    );
};

export default DownloadBanner;