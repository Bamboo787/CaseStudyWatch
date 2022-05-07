const btn = document.querySelectorAll('button');
btn.forEach(function (button) {
    button.addEventListener('click', function (event) {
        {
            let btnItem = event.target;
            let product = btnItem.parentElement;
            let productImg = product.querySelector('img').src;
            let productName = product.querySelector('h2').innerText;
            let productPrice = product.querySelector('span').innerText;

            addcart(productImg, productName, productPrice)
        }
    })
})

function addcart(productImg, productName, productPrice) {
    let cartTbody = document.querySelector('tbody');
    let cartItem = document.querySelectorAll('tbody tr');
    for (let i = 0; i < cartItem.length; i++) {
        let productT = document.querySelectorAll(".tittle")
        if (productT[i].innerHTML == productName) {
            alert('Sản phẩm của bạn đã có trong giỏ hàng!')
            return
        }
    }

    let addtr = document.createElement('tr');
    let trContend = '<tr><td style="display: flex; align-items: center;"><img style="width: 100px" src="' + productImg + '" alt=""><span class="tittle">' + productName + '</span></td><td><span class="prices">' + productPrice + '</span>$</td><td><input style="width: 30px; outline: none;" type="number" value="1" min="1"></td><td style="cursor: pointer;"><span class="cart-delete">Xóa</span></td></tr>';
    // let trContend = '<tr><td style="display: flex; align-items: center;"><img style="width: 100px" src="images/2.jpg" alt="">Iphone 13 pro</td><td><span>320.000</span><sup>đ</sup></td><td><input style="width: 50px; outline: none;" type="number" value="1" min="1"></td><td style="cursor: pointer;">Xóa</td></tr>'
    cartTbody.append(addtr);
    addtr.innerHTML = trContend;

    cartTotal()
    removeCart()

}
// tinh total______________________________________________________


//        <tr>
//            <td style="display: flex; align-items: center;"><img style="width: 100px" src="images/2.jpg" alt="">Iphone 13 pro</td>
//            <td><span>320</span></td>
//            <td><input style="width: 50px; outline: none;" type="number" value="1" min="1"></td>
//            <td style="cursor: pointer;">Xóa</td>
//        </tr> -->

function cartTotal() {
    let totalB = 0;
    let cartItem = document.querySelectorAll('tbody tr');
    for (let i = 0; i < cartItem.length; i++) {
        let quanityValue = cartItem[i].querySelector('input').value;
        let priceValue = cartItem[i].querySelector('.prices').innerHTML;
        let totalA = priceValue * quanityValue * 1000;
        totalB += totalA;
    }
    let total = document.querySelector('.price-total span');
    let cartPrice = document.querySelector('.cart-icon span');
    total.innerHTML = totalB.toLocaleString('de-DE');
    cartPrice.innerHTML = totalB.toLocaleString('de-DE');
    inputChange()
}

// removed ___________________________________________
function removeCart() {
    let cartItem = document.querySelectorAll('tbody tr');
    for (let i = 0; i < cartItem.length; i++) {
        let productT = document.querySelectorAll('.cart-delete');
        productT[i].addEventListener("click", function (event) {
            let cartRemvove = event.target;
            let cartitemR = cartRemvove.parentElement.parentElement;
            let confirm = window.confirm("Bạn có chắc muốn xoá sản phẩm này không?")
            if (confirm) {
                cartitemR.remove();
            }  
            cartTotal()
            search()

        })
    }
}


function inputChange() {
    let cartItem = document.querySelectorAll('tbody tr');
    for (let i = 0; i < cartItem.length; i++) {
        let inputValue = cartItem[i].querySelector("input");
        inputValue.addEventListener('change', function () {
            cartTotal()
        })
    }
}

const cartShown = document.querySelector(".btn-primary");
cartShown.addEventListener("click", function () {
    document.querySelector(".cart").style.bottom = "0"
})


function search() {
    // console.log(event)
    // let keywork = event.target.value;
    let keywork = document.querySelector('#search').value;
    let result = addtr.filter(function (product, index) {
        return addtr.toLowerCase().indexOf(keywork.toLowerCase()) != -1;
    })
    addcart(result);
}

function cartShow() {
    document.querySelector(".cart").classList.remove('cart-none');
}
function closeForm() {
    document.querySelector(".cart").classList.add('cart-none');
}

function pay() {
    alert("Bạn đã thanh toán thành công!")
}

