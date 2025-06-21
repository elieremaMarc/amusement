from flask import Flask, request, jsonify
from flask_cors import CORS
import pyqrcode
import io
import base64
import os


app = Flask(__name__)
CORS(app)

@app.route("/api", methods=["GET"])
def recup():
    # Récupération des infos
    nom = request.args.get("nom")
    prenom = request.args.get("prenom")
    mail = request.args.get("mail")
    lien = request.args.get("lien")

    if not all([nom, prenom, mail, lien]):
        return jsonify({"error": "Champs manquants"}), 400

    # Générer URL encodée
    query_params = {
        "nom": nom,
        "prenom": prenom,
        "mail": mail,
        "lien": lien
    }


    # Générer QR code
    qr = pyqrcode.create(lien)
    buffer = io.BytesIO()
    qr.png(buffer, scale=6)
    buffer.seek(0)
    qr_base64 = base64.b64encode(buffer.read()).decode("utf-8")

    return jsonify({
        "message": "OK",
        "qr_image_base64": qr_base64
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render définit PORT
    app.run(host="0.0.0.0", port=port)
