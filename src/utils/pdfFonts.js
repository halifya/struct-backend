const  path =  require('path')

const pdfFont  =  {
  Courier: {
    normal: 'Courier',
    bold: 'Courier-Bold',
    italics: 'Courier-Oblique',
    bolditalics: 'Courier-BoldOblique'
  },
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique'
  },
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic'
  },
  Symbol: {
    normal: 'Symbol'
  },
  THSarabunNew: {
    normal: path.resolve(__dirname, '../../fonts/THSarabunNew.ttf'),
    bold: path.resolve(__dirname, '../../fonts/THSarabunNew_Bold.ttf'),
  },
  ZapfDingbats: {
    normal: path.resolve(__dirname, '../../fonts/ZapfDingbats.ttf'),
  }
}



module.exports = pdfFont ;