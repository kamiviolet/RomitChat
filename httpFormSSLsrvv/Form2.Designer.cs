﻿
namespace httpFormSSLsrvv
{
    partial class Form2
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.button1_OK = new System.Windows.Forms.Button();
            this.textBox1_headrs = new System.Windows.Forms.TextBox();
            this.button1 = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // button1_OK
            // 
            this.button1_OK.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.button1_OK.Location = new System.Drawing.Point(432, 355);
            this.button1_OK.Name = "button1_OK";
            this.button1_OK.Size = new System.Drawing.Size(75, 23);
            this.button1_OK.TabIndex = 0;
            this.button1_OK.Text = "Apply";
            this.button1_OK.UseVisualStyleBackColor = true;
            this.button1_OK.Click += new System.EventHandler(this.button1_OK_Click);
            // 
            // textBox1_headrs
            // 
            this.textBox1_headrs.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.textBox1_headrs.Location = new System.Drawing.Point(20, 21);
            this.textBox1_headrs.Multiline = true;
            this.textBox1_headrs.Name = "textBox1_headrs";
            this.textBox1_headrs.Size = new System.Drawing.Size(487, 328);
            this.textBox1_headrs.TabIndex = 1;
            // 
            // button1
            // 
            this.button1.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.button1.Location = new System.Drawing.Point(20, 355);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(75, 23);
            this.button1.TabIndex = 2;
            this.button1.Text = "Clear";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // Form2
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(533, 390);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.textBox1_headrs);
            this.Controls.Add(this.button1_OK);
            this.Name = "Form2";
            this.Text = "Form2";
            this.Load += new System.EventHandler(this.Form2_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button button1_OK;
        public System.Windows.Forms.TextBox textBox1_headrs;
        private System.Windows.Forms.Button button1;
    }
}

