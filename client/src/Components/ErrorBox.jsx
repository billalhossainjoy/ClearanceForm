
const ErrorBox = ({children}) => {

  return ( 
    <div className="w-full p-3 bg-red-500 text-white rounded my-2">
      {children}
    </div>
  );
}

export default ErrorBox