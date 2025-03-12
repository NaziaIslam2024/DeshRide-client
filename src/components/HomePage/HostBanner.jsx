import host from "../../assets/host-banner.webp";

const HostBanner = () => {
    return (
        <div className="w-11/12 mx-auto mt-10">
            <img src={host} className="w-full" alt="" />
        </div>
    );
};

export default HostBanner;