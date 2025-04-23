window.onload = function () {
    fetch("/routine")
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector(".left");
            data.forEach(routine => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `
                    <h3>${routine.name}</h3>
                    <p>Descrição: ${routine.description || "Sem descrição"}</p>
                    <div style="margin-top: 10px;">
                        <button onclick="deleteRoutine(${routine.id}, this)">🗑️</button>
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar rotinas:", error);
        });
};

function addItem() {
    const name = document.getElementById("itemName").value.trim();
    const description = document.getElementById("itemDescription").value.trim();

    if (!name) {
        alert("O nome é obrigatório!");
        return;
    }

    const data = { name, description };

    fetch("/routine", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <h3>${data.name}</h3>
                <p>Descrição: ${data.description || "Sem descrição"}</p>
                <div style="margin-top: 10px;">
                    <button onclick="deleteRoutine(${data.id}, this)">🗑️</button>
                </div>
            `;
            document.querySelector(".left").appendChild(card);
            closeModal();
        })
        .catch(error => {
            console.error("Erro ao adicionar rotina:", error);
            alert("Erro ao adicionar rotina.");
        });
}

function deleteRoutine(id, button) {
    if (confirm("Tem certeza que deseja remover esta rotina?")) {
        fetch(`/routine/${id}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    button.parentElement.parentElement.remove();
                } else {
                    alert("Erro ao deletar rotina.");
                }
            })
            .catch(error => {
                console.error("Erro ao deletar rotina:", error);
                alert("Erro ao conectar com o servidor.");
            });
    }
}

function editRoutine(id, button) {
    const card = button.closest(".card");
    const name = card.querySelector("h3").textContent;
    const description = card.querySelector("p").textContent.split(": ")[1];

    document.getElementById("itemName").value = name;
    document.getElementById("itemDescription").value = description;
    document.getElementById("itemModal").style.display = "flex";

    const confirmBtn = document.querySelector(".modal-actions .create");
    const newBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
    newBtn.textContent = "Salvar";

    newBtn.onclick = function () {
        const updatedRoutine = {
            name: document.getElementById("itemName").value.trim(),
            description: document.getElementById("itemDescription").value.trim()
        };

        if (!updatedRoutine.name) {
            alert("O nome é obrigatório!");
            return;
        }

        fetch(`/routine/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedRoutine)
        })
            .then(response => {
                if (response.ok) {
                    alert("Rotina atualizada!");
                    location.reload();
                } else {
                    alert("Erro ao atualizar rotina.");
                }
            })
            .catch(error => {
                console.error("Erro ao atualizar rotina:", error);
                alert("Erro ao atualizar rotina.");
            });
    };
}

function closeModal() {
    document.getElementById("itemModal").style.display = "none";
}

document.getElementById("openModalBtn").onclick = () => {
    document.getElementById("itemName").value = "";
    document.getElementById("itemDescription").value = "";
    document.getElementById("itemModal").style.display = "flex";

    const confirmBtn = document.querySelector(".modal-actions .create");
    const newBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);

    newBtn.textContent = "Criar";
    newBtn.onclick = addItem;
};
