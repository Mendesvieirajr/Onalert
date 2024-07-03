import React from 'react';
import { View, Text, ScrollView, StyleSheet, useColorScheme, Linking } from 'react-native';
import Colors from '../constants/Colors';

const TOSScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background }]}>
      <Text style={[styles.header, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Termos de Serviço (TOS) - OnAlert!</Text>
      <Text style={[styles.text, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>
        Última atualização: 02/07/2024
        {"\n\n"}
        Bem-vindo ao OnAlert! Ao usar nosso aplicativo, você concorda com os seguintes termos de serviço.
        {"\n\n"}
        1. Aceitação dos Termos {"\n"}
        Ao acessar ou usar o OnAlert!, você concorda em seguir e estar vinculado a estes Termos de Serviço.
        {"\n\n"}
        2. Descrição do Serviço {"\n"}
        OnAlert! é um aplicativo móvel que permite aos usuários armazenar seus registros médicos, fazer chamadas de emergência para o 112 e autorizar o compartilhamento de sua localização com contatos de emergência. Inspirado no texto bíblico de Provérbios 22:3, nosso objetivo é promover a prudência e a segurança.
        {"\n\n"}
        3. Registro e Conta de Usuário {"\n"}
        Você deve fornecer informações precisas e completas ao criar uma conta. {"\n"}
        Você é responsável por manter a segurança de sua conta e senha. {"\n"}
        OnAlert! não se responsabiliza por qualquer perda ou dano decorrente do uso não autorizado de sua conta.
        {"\n\n"}
        4. Privacidade e Segurança de Dados {"\n"}
        Armazenamos e processamos suas informações pessoais de acordo com nossa Política de Privacidade. {"\n"}
        Seus registros médicos são armazenados de forma segura e apenas você tem acesso a eles. {"\n"}
        Com seu consentimento, podemos compartilhar sua localização e informações de contato com serviços de emergência em situações críticas.
        {"\n\n"}
        5. Uso do Serviço {"\n"}
        Você concorda em usar o OnAlert! apenas para fins legais e conforme permitido por estes Termos. {"\n"}
        É proibido o uso do serviço para qualquer atividade ilegal, fraudulenta ou prejudicial.
        {"\n\n"}
        6. Chamadas de Emergência {"\n"}
        O botão de chamada para o 112 é uma funcionalidade crítica e deve ser usado apenas em situações de emergência médica. {"\n"}
        OnAlert! não se responsabiliza por falhas nas chamadas de emergência devido a problemas de rede ou dispositivo.
        {"\n\n"}
        7. Limitação de Responsabilidade {"\n"}
        OnAlert! não se responsabiliza por qualquer dano direto, indireto, incidental ou consequente resultante do uso do aplicativo. {"\n"}
        O uso do aplicativo é por sua conta e risco.
        {"\n\n"}
        8. Alterações nos Termos {"\n"}
        Reservamo-nos o direito de modificar estes Termos a qualquer momento. {"\n"}
        Quaisquer alterações serão publicadas nesta página e a data de atualização será ajustada.
        {"\n\n"}
        9. Contato {"\n"}
        Para dúvidas ou preocupações sobre estes Termos de Serviço, entre em contato conosco através do nosso suporte, on.alertbot@gmail.com.
        {"\n\n"}
        Inspirados na Prudência {"\n"}
        O OnAlert! é inspirado no princípio de prudência encontrado em Provérbios 22:3: "Quem é prudente vê o perigo e esconde-se(...)". Nosso objetivo é fornecer uma ferramenta útil para ajudar nossos usuários a se prepararem e se protegerem em situações de emergência.
        {"\n\n"}
        Obrigado por usar o OnAlert!
        {"\n\n"}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default TOSScreen;