const Whothere = () => {
return (
    <div
      className="fixed overflow-hidden  items-center justify-center"
      style={{ fontFamily: 'Abhaya Libre, sans-serif' }}
    >
      {/* Header */}
      <div
        className="bg-white w-[350px] h-[80px] text-[45px] font-extrabold text-[#E76F51] flex flex-col items-center pt-[8px]"
        style={{ fontFamily: 'Abhaya Libre, sans-serif' }}
      >
        
          <div className="flex flex-row items-center justify-center">
            <img className="w-[55px] h-[55px] mr-4" src="src/client/img/French Fries.png" alt="French Fries" />
            <img className="w-[22px] h-[27px]  mt-12 absolute left-[20%]" src="src/client/img/heart.png" alt="Heart" />
            <span className="text-[#E76F51] text-[40px] ml-6 mr-6 font-extrabold">Preview </span>
            <img className="w-[22px] h-[27px] mt-[-40px] absolute right-[20%]" src="src/client/img/heart2.png" alt="Heart" />
            <img className="w-[55px] h-[55px] ml-4 " src="src/client/img/pizza.png" alt="Pizza" />
          </div>
        
      </div>
      <div style={{ }}>
        <button style={{ border: 'none', background: 'none' }}>
            <a href='/Edit'><img
            src="src/client/img/Back.png"
            alt="Button Image"
            style={{ width: '30px', height: '30px' }}
          /> </a>
          
        </button>
        <span style={{ color: 'BLACK', fontSize: '20px', marginTop: '8px' }}>EDIT</span>
      </div>
    </div>
      );
    };
    
export default Whothere;