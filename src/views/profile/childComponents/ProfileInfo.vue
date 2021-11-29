<template>
  <table class="ProfileInfo">
    <tr>
      <td>
        <div>
          <div class="num">{{account_num}}</div>
          <div class="messureMent">元</div>
        </div>

        <div class="desc">{{account}}</div>
      </td>

      <td>
        <div>
          <div class="num">{{discount_num}}</div>
          <div class="messureMent">个</div>
        </div>

        <div class="desc">{{discount}}</div>
      </td>
      <td>
        <div>
          <div class="num">{{points_num}}</div>
          <div class="messureMent">分</div>
        </div>

        <div class="desc">{{points}}</div>
      </td>
    </tr>
  </table>
</template>

<script>
  export default {
    name: "ProfileInfo",
    data(){
      return{
        account:'我的余额',
        account_num:'0.00',
        discount:'我的优惠',
        discount_num:'0',
        points:'我的积分',
        points_num:'0'
      }
    }
  }
</script>

<style scoped>
.ProfileInfo{
  width: 100%;
  text-align: center;
}

  .ProfileInfo tr td{
    border-right: 1px solid rgba(210,210,210,.3);
    border-bottom:20px solid rgba(244,244,243,.5);
    padding: 20px;
  }

.ProfileInfo tr td:last-child{
  border-right: none;
}

.ProfileInfo tr td>div{
  display: flex;
}

  .num{
    color: red;
    font-size: 28px;
  }

  .messureMent{
    margin-top: 10px;
    margin-left: 5px;
  }

  .desc{
    padding-top: 5px;
  }
</style>
