using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace httpFormSSLsrvv
{
    public partial class Form2 : Form
    {
        public Form2()
        {
            InitializeComponent();
        }

        private void Form2_Load(object sender, EventArgs e)
        {
            readExtraHeadersTObox();
        }

        public void readExtraHeadersTObox()
        {
            var posibleExtraHaders = Form1.meForm1.ExtraAditionalHeadrs;
            if (posibleExtraHaders.Count > 0)
            {
                textBox1_headrs.Text = "";
                foreach (var oneHudr in posibleExtraHaders)
                {
                    textBox1_headrs.Text += oneHudr + "\x0D\x0A";
                }
            }
        }

        private void button1_OK_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(textBox1_headrs.Text))
            {
                Form1.meForm1.ExtraAditionalHeadrs.Clear();
                    
            }
            else
            {
                var amaterishHeadersValues = string.Copy(textBox1_headrs.Text);
                amaterishHeadersValues = amaterishHeadersValues.Trim();
                amaterishHeadersValues = amaterishHeadersValues.Trim(' ', '\x0A', '\x0D');

                if (amaterishHeadersValues.Length > 0)
                {
                    textBox1_headrs.Text = amaterishHeadersValues;

                    var napluto = amaterishHeadersValues.Split(new char[] { '\x0A', '\x0D' }, StringSplitOptions.RemoveEmptyEntries);
                    var infokunteer = 0;
                    var infoTotalAddedCount = 0;
                    foreach (var jedenPlivanec in napluto)
                    {
                        if (Form1.vrbosePrint)
                            Form1.meForm1.WPB("i:{0}, hv:{1}, len:{2}", infokunteer, jedenPlivanec, jedenPlivanec.Length);
                      
                        infokunteer++;

                        var trimedPlyvanec = jedenPlivanec.Trim();
                        if (trimedPlyvanec.Length > 0)
                        {
                            if (Form1.meForm1.ExtraAditionalHeadrs.Contains(trimedPlyvanec))
                            {
                                if (!Form1.meForm1.ExtraAditionalHeadrs.Remove(trimedPlyvanec))
                                {
                                    Form1.meForm1.WPB("failed remove header:{0}", trimedPlyvanec);
                                }
                            }

                            Form1.meForm1.ExtraAditionalHeadrs.Add(trimedPlyvanec);
                            infoTotalAddedCount++;
                        }
                    }

                    Form1.meForm1.WPB("added {0} extra headers, cureently have total:{1}", infoTotalAddedCount, Form1.meForm1.ExtraAditionalHeadrs.Count);
                    readExtraHeadersTObox();
                }

            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            textBox1_headrs.Clear();
            textBox1_headrs.Text = "";
        }
    }
}
