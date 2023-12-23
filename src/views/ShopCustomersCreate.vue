<template>
  <div>
    <ApplicationBar />
    <NavigationDrawer />
    <FooterBar />
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
                <h1>新規顧客作成</h1>
              </v-card-title>

              <v-card-text>
                <v-form @submit.prevent="onClick">
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="名前"
                        v-model="name"
                        :error-messages="nameError ? [nameError] : []"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-text-field
                        label="年齢"
                        v-model="age"
                        type="number"
                        :error-messages="ageError ? [ageError] : []"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-text-field
                        label="最終訪問日"
                        v-model="lastVisitDate"
                        type="date"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-textarea
                        label="メモ"
                        v-model="memo"
                        :error-messages="memoError ? [memoError] : []"
                      ></v-textarea>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-btn type="submit" color="primary">作成</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>


<script setup>
import ApplicationBar from '../components/ApplicationBar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
import FooterBar from '../components/FooterBar.vue'
import { ref } from 'vue';
import { axiosInstance } from '../utils/axios.js';
import { useRouter } from 'vue-router';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  name: yup
        .string()
        .required("入力は必須です")
        .max(50, "50文字以下で入力してください"),
  age: yup
        .number()
        .typeError("数字を入力してください")
        .min(0, "0以上で入力してください")
        .max(150, "150以下で入力してください"),
  memo: yup
        .string()
        .max(200, "200文字以下で入力してください"),
});

useForm({
  validationSchema: schema,
});

const { value: name, errorMessage: nameError } = useField('name');
const { value: age, errorMessage: ageError } = useField('age');
const { value: memo, errorMessage: memoError } = useField('memo');
const lastVisitDate = ref(null);
const router = useRouter();

const onClick = async () => {
  try {
    // 顧客データの作成
    const data = {
      name: name.value,
      age: age.value,
      last_visit_date: lastVisitDate.value,
      memo: memo.value
    };
    // 顧客データをサーバーに送信
    await axiosInstance.post('shop/customers', data);
    // 顧客一覧ページにリダイレクト
    router.push({ name: 'customerList' });
  } catch (error) {
    console.error('Error creating customer:', error);
  }
};
</script>

<style>
.title {
  width: 500px;
}
.contents {
  width: 500px;
  height: 300px;
}
.button {
  margin-top: 20px;
}
</style>
