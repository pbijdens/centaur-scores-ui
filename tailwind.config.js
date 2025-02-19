/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'accenta': { // used as default background for page headers, table headers etc.
          'DEFAULT': '#164A13', // https://maketintsandshades.com/#164A13
          '900': '#164A13',
          '800': '#2D5C2B	',
          '700': '#456E42',
          '600': '#5C805A',
          '500': '#739271',
          '400': '#8BA589',
          '300': '#A2B7A1',
          '200': '#B9C9B8',
          '100': '#D0DBD0',
          '000': '#E8EDE7',
        },
        'accentafg': { // used as default background for page headers, table headers etc.
          'DEFAULT': '#FFFFFF', // https://maketintsandshades.com/#164A13
          '900': '#FFFFFF',
          '800': '#E6E6E6	',
          '700': '#CCCCCC',
          '600': '#B3B3B3',
          '500': '#999999',
          '400': '#808080',
          '300': '#666666',
          '200': '#4C4C4C',
          '100': '#333333',
          '000': '#191919',
        },
        'accentb': { // Should complement accenta and be readable normally
          'DEFAULT': '#FDC621', // https://maketintsandshades.com/#fdc621 
          '900': '#FDC621',
          '800': '#FDCC37	',
          '700': '#FDD14D',
          '600': '#FED764',
          '500': '#FEDD7A',
          '400': '#FEE390',
          '300': '#FEE8A6',
          '200': '#FEEEBC',
          '100': '#FFF4D3',
          '000': '#FFF9E9',
        },
        'accentbfg': { // Should complement accenta and be readable normally
          'DEFAULT': '#8f21fd', // https://maketintsandshades.com/#fdc621 
          '900': '#8F21FD',
          '800': '#811EE4	',
          '700': '#721ACA',
          '600': '#6417B1',
          '500': '#561498',
          '400': '#48117F',
          '300': '#390D65',
          '200': '#2B0A4C',
          '100': '#1D0733',
          '000': '#0E0319',
        },
        'cardbg': {
          'DEFAULT': '#F1F4F1',
        },
        'cardaltbg': {
          'DEFAULT': '#ced8ce',
        },        
        'cardfg': {
          'DEFAULT': '#000000',
        },
        'modalbg': {
          'DEFAULT': '#F1F4F1',
        },
        'modalfg': {
          'DEFAULT': '#343434',
        },
        'labelfg': {
          'DEFAULT': '#343434',
        },
        'errorbg': {
          'DEFAULT': '#FFCCCC',
        },
        'errorfg': {
          'DEFAULT': '#000000',
        },          
        'backdrop': {
          'DEFAULT': '#040F04',
        },
        'tabcardbg': {
          'DEFAULT': '#FFFFFF',
        },
        'tabcardfg': {
          'DEFAULT': '#000000',
        },
        'tabdisabled': {
          'DEFAULT': '#dddddd',
          '500': '#bbbbbb'
        },
        'tabdisabledfg': {
          'DEFAULT': '#555555',
          '500': '#333333'
        },
      }
    },
  },
  plugins: [],
}


