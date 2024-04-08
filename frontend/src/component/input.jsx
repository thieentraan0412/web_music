import "./css/input.css";
function Input({ label, type, placeholder, data, setdata }) {
  return (
    <form>
      <label>
        {label}
      </label>
      <input type={type} onChange={(e) => setdata(e.target.value)} />
    </form>
  );
}
export default Input;
