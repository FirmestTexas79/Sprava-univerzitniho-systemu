import java.sql.Connection;
import java.sql.SQLException;
import java.sql.CallableStatement;

public class ApplicationInitializer {
    public static void inicializaceAplikace() {
        // Volání uložené procedury pro aktualizaci průměrného hodnocení pro všechny studenty
        try {
            Connection connection = DatabaseManager.getConnection();
            CallableStatement callableStatement = connection.prepareCall("{CALL AktualizacePrumeru()}");
            callableStatement.execute();
            connection.close();
            System.out.println("Průměrná hodnocení všech studentů byla aktualizována.");
        } catch (SQLException ex) {
            ex.printStackTrace();
            System.out.println("Chyba při aktualizaci průměrných hodnocení studentů: " + ex.getMessage());
        }
    }
}
