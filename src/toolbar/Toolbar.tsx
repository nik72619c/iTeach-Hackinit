import React from 'react';
import classNames from 'classnames';
import './Toolbar.scss';
import ScreenRecorder from '../Recorder/screenRecorder';
/**
 * Toolbar component handles all the app controls such as color selection,
 * weight, undo, redo, clean, etc.
 * @class Toolbar
 * @example <Toolbar colors={[]} weights={[]} setColor={() => void} setWeight={() => void} undo={() => void} clear={() => void}/>
 */

function hexToRgb(hex: any) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: 0.3
      }
    : hex;
}

class Toolbar extends React.Component<any, {}> {
  state = { isRecording: false, image: '' };

  uploadFile = async (e: any) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'Sick-fits');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dv95rctxg/image/upload',
      {
        method: 'POST',
        body: data
      }
    ).then(d => d.json());
    this.setState({
      image: res.eager[0].secure_url
    },()=>{
      const canvas = document.querySelector('#canvas');
      (canvas as any).style.setProperty('background',`url(${this.state.image})`);
      (canvas as any).style.setProperty('background-position',`center center`);
      (canvas as any).style.setProperty('background-repeat',`no-repeat`);
      (canvas as any).style.setProperty('background-size',`contain`);
      (canvas as any).style.setProperty('width',`100%`);

    });
  };

  toggleRecording = () => {
    this.setState({ isRecording: !this.state.isRecording }, () => {
      if (!this.state.isRecording) {
        // tslint-disable-next-line:no-def
        (window as any).stopCallback();
      }
    });
  };

  render() {
    const {
      colors,
      selectedColor,
      weights,
      selectedWeight,
      setColor,
      setWeight,
      undo,
      redo,
      clear,
      highlightStatus
    } = this.props;

    return (
      <aside id='toolbar'>
        <h3>Select a color</h3>
        <ul id='color-picker'>
          {colors.map((color: any) => {
            console.log({ highlightStatus });
            if (highlightStatus) {
              const { r, g, b, a } = hexToRgb(color);
              color = `rgb(${r}, ${g}, ${b}, ${a})`;
            }
            console.log(color);
            const className = classNames('toolbar-button', 'color-item', {
              selected: color === selectedColor
            });
            return (
              <li
                key={color}
                className={className}
                style={{ backgroundColor: color }}
                onClick={() => setColor(color)}
              >
                &nbsp;
              </li>
            );
          })}
        </ul>
        <h3>Select weight</h3>
        <ul id='#weight-picker'>
          {weights.map((weight: any, index: number) => {
            const className = classNames('toolbar-button', 'weight-item', {
              selected: weight === selectedWeight
            });
            return (
              <li
                key={`menu-item-${index}`}
                className={className}
                onClick={() => setWeight(weight)}
              >
                <span style={{ borderBottomWidth: weight }} />
              </li>
            );
          })}
        </ul>
        <h3>Undo, redo & clear</h3>
        <a
          id='toolbar-undo'
          className='toolbar-button edit-item'
          onClick={() => undo()}
        >
          ↺
        </a>
        <a
          id='toolbar-redo'
          className='toolbar-button edit-item'
          onClick={() => redo()}
        >
          ↻
        </a>
        <a
          id='toolbar-clear'
          className='toolbar-button edit-item'
          onClick={() => clear()}
        >
          ×
        </a>
        <div>
          <input type='checkbox' name='audio' />
          <div>Audio</div>
          <input type='checkbox' onChange={(e)=>this.props.setRecording(e.target.checked)} name='webcam' />
          <div>Webcam</div>
          <input type='checkbox' name='screen' />
          <div>Screen</div>
        </div>
        <button onClick={() => this.toggleRecording()}>
          {this.state.isRecording ? 'Stop' : 'Start'} Recording{' '}
        </button>
        {this.state.isRecording && <ScreenRecorder />}
        <label htmlFor='Image'>
          Upload Image
          <input
            type='File'
            name='Image'
            id='Image_label'
            placeholder='Upload Image'
            required
            onChange={this.uploadFile}
          />
        </label>
      </aside>
    );
  }
}

export default Toolbar;
