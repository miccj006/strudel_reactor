function PreprocessTextArea({ songText, onChange }) {
      return (
          <>
              <textarea className="form-control my-2" rows="15" value={songText} onChange={onChange} id="proc" ></textarea>
          </>
      );
}

export default PreprocessTextArea;