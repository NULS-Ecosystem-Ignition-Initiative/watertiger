const Button: React.FC = ({ children }) => {
  return (
    <div className="w-full rounded bg-tekDark py-1.5 px-5 text-center text-base uppercase text-white transition-all hover:bg-gray-800">
      {children}
    </div>
  );
};

export default Button;
