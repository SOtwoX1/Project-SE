export default function Success_MPA(){
    const go_to_setting = () => {
        window.location.href = "/Setting-Profile";
    };
    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center space-y-[35px]">
                <img 
                src="src\client\img\Sticker.png" 
                alt="Sucess Img" 
                className="w-[100px] h-[100px]"
                />
                <div className="w-[232px] h-[74px] flex flex-col text-center">
                    <p className="text-2xl font-semibold">Add New Credit card Sucessfully</p>
                </div>
            </div>
            <div>
                <button 
                onClick={go_to_setting}
                className="w-[331px] h-[56px] bg-[#E9C46A] rounded-lg font-semibold mt-[60px] text-white">
                    Back to settings
                </button>
            </div>
        </div>
    );
}