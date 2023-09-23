import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Estilos del editor

class HTMLEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '', // El contenido HTML editable se almacenará en el estado
    };
    this.quillRef = React.createRef(); // Ref para el editor Quill
  }

  handleChange = (content) => {
    this.setState({ content });
  };

  handleInsertImage = () => {
    const quill = this.quillRef.current.getEditor();
    const url = prompt('Inserta la URL de la imagen:');
    if (url) {
      quill.insertEmbed(quill.getSelection().index, 'image', url);
    }
  };

  render() {
    return (
      <div>
        <h1>Editor HTML en React</h1>
        <button onClick={this.handleInsertImage}>Insertar Imagen</button>
        <ReactQuill
          ref={this.quillRef}
          value={this.state.content}
          onChange={this.handleChange}
          modules={{
            toolbar: {
              container: [
                [{ 'header': '1' }, { 'header': '2' }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link'],
                [{ 'align': [] }],
                ['image'], // Botón personalizado para imágenes
              ],
              handlers: {
                'image': this.handleInsertImage, // Manejador para el botón de imágenes
              },
            },
          }}
        />
        <div>
          <h2>Vista previa del contenido:</h2>
          <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
        </div>
      </div>
    );
  }
}

export default HTMLEditor;
