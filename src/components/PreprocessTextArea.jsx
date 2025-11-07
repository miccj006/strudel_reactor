function PreprocessTextArea({ songText, onChange }) {
      return (
          <>
              <textarea className="form-control my-2 shadow-inner bg-light" rows="15" value={songText} onChange={onChange} id="proc" ></textarea>
          </>
      );
}

export default PreprocessTextArea;