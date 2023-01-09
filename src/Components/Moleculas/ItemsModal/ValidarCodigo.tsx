import { IconArrow } from "Components/Atoms/Icons";
import { AuthContext } from "Context/auth/AuthContext";
import { NotificacionContext } from "Context/Notificaciones/NotificacionContext";
import { createRef, useContext, useEffect, useState } from "react";
import { IAuth, IMobile, TipoAuth } from "types-yola";

interface Props {
	setValidCode: React.Dispatch<React.SetStateAction<boolean>>
	dataValidada: IAuth | IMobile
	setDataValidada: React.Dispatch<React.SetStateAction<IAuth>>
	conQueIniciar: TipoAuth
}

const ValidarCodigo = (props:Props) => {

	const { setValidCode, dataValidada, conQueIniciar } = props

	const { setNotificacion } = useContext(NotificacionContext)
	const { registrarConEmail, registrarConMovil } = useContext(AuthContext)
	    
    
	// number of inputs
	const numerOfInputs = 4;
  
	// create a array of refs
	const [inputRefsArray] = useState<any[]>(() =>
	  Array.from({ length: numerOfInputs }, () => createRef())
	);
  
	// state for current input index
	const [currentIndex, setCurrentIndex] = useState(0);
  
	// save letters in a array where each entry in the array refers to an input
	const [letters, setLetters] = useState(() =>
	  Array.from({ length: numerOfInputs }, () => "")
	);

	  // onPaste

		const [text, setText] = useState("");

	  const pasteHandler = (event) => {
		// Transform the copied/cut text to upper case
		event.currentTarget.value = event.clipboardData
		  .getData("text")
		  .toUpperCase();

		  setText(event.currentTarget.value)
	
		event.preventDefault();
	  };
  
	const handleKeyPress = () => {
	  setCurrentIndex((prevIndex) => {
		// calculate the next input index, next input after the final input will be again the first input. you can change the logic here as per your needs
		const nextIndex = prevIndex < numerOfInputs - 1 ? prevIndex + 1 : 0;
		const nextInput = inputRefsArray?.[nextIndex]?.current;
		nextInput.focus();
		nextInput.select();
		return nextIndex;
	  });
	};

	const onSubmit = async (e) => {
		e.preventDefault()
		if(letters.length !== 4) return setNotificacion({message: "Indica el codigo de verificacion", type: 1})

		if(conQueIniciar === "CORREO"){
			const res = await registrarConEmail({...dataValidada, codigo: letters.join("")} as IAuth);
			if (!res.ok) setNotificacion({ message: res.mensaje, type: 1 })
		}

		if(conQueIniciar === "MOVIL"){
			const res = await registrarConMovil({...dataValidada, codigo:letters.join("")} as IMobile);
			if (!res.ok) setNotificacion({ message: res.mensaje, type: 1 })
		}

	}
  
	useEffect(() => {
	  // focus the firs iput initially
	  if (inputRefsArray?.[0]?.current) {
		inputRefsArray?.[0]?.current?.focus();
	  }
	  
	  // add the event listener for keyup keyboard event
	  window.addEventListener("keyup", handleKeyPress, false);
	  
	  // remove the event listener when the component unmounts
	  return () => {
		window.removeEventListener("keyup", handleKeyPress);
	  };
	}, []);

	useEffect(()=>{
		if(text){
			setLetters(text.split(""))
		}
	},[text])
	
	return (
    <div className="absolute w-full h-full flex bg-white top-0 left-0 z-10 flex-col p-5 justify-center items-center">
		{letters.length}
      <button className=" fixed top-0 right-0 bg-rose-500 px-4 py-2 text-rose-100 " onClick={()=>setValidCode(false)}>
        <IconArrow />
      </button>
      <form 
	  	onSubmit={onSubmit}
		className="max-w-xs flex flex-col gap-y-5 border box-content p-5 rounded-lg shadow-lg border-green-200 shadow-green-200">
        <h3 className="font-bold text-2xl">Verificación de correo</h3>
        <p className="text-gray-600 ">
          Nosotros hemos enviado un codigo a tu correo electronico
          yelsino321@gmail.com por favor verificar
        </p>

        <div className="flex gap-x-5 select-none">
		{inputRefsArray.map((ref, index) => {
        return (
          <input
			className="w-full bg-color_green_2 py-4 px-5  text-color_green_7 outline-none rounded-lg text-center font-bold select-none selection:bg-color_green_3 font-concert-one "
            ref={ref}
            type="text"
            id={`box${index}-1`}
			onPaste={pasteHandler}
            onChange={(e) => {
              const { value } = e.target;
			  if (value.length > 1) {
				return;
			  }

              setLetters((letters) =>
                letters.map((letter, letterIndex) =>
                  letterIndex === index ? value : letter
                )
              );
            }}
            onClick={(e:any) => {
              setCurrentIndex(index);
              e.target.select();
            }}
            value={letters[index]}
            max={"1"}
          />
        );
      })}
        </div>
        <p className="text-center text-gray-500 ">
          ¿No recibiste el códio?{' '}
          <span className="text-color_green_7 font-medium ">Reenviar</span>
        </p>
		<input type="text" className="" />
        <button
			type="submit"
          className="w-full bg-color_green_2 py-4 px-5 font-poppins text-color_green_7 outline-none rounded-lg hover:shadow-sm ease-in-out duration-300 hover:shadow-green-200 font-medium"
        >Validar correo</button>
      </form>
    </div>
  )
}
 
export default ValidarCodigo;